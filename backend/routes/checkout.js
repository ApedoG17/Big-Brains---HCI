/**
 * routes/checkout.js
 * POST /api/checkout — atomic checkout with price verification + Paystack + WebSocket
 *
 * Flow:
 *  1. Authenticate user (JWT)
 *  2. Re-fetch prices from DB (never trust frontend)
 *  3. Validate all items are in stock
 *  4. For MoMo/card: initialize a Paystack transaction, return payment URL
 *  5. Paystack webhook (POST /api/checkout/webhook) confirms payment → creates order
 *  6. For cash: create order immediately, emit WebSocket to KDS
 *
 * This module exports a factory function so it can receive the `io` (Socket.IO)
 * instance from server.js.
 */

import { Router } from 'express'
import https from 'https'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

export default function checkoutRouter(io) {
  const router = Router()

  // ── POST /api/checkout ──────────────────────────────────────────────────────
  // Body: {
  //   items: [{ itemId, quantity, selectedPrice }],
  //   deliveryDetails: { fullName, phone, address, notes, packaging },
  //   paymentMethod: 'mobile-money' | 'card' | 'cash'
  // }
  router.post('/', requireAuth, (req, res) => {
    const { items, deliveryDetails, paymentMethod } = req.body

    // ── Input validation ─────────────────────────────────────────────────────
    if (!items?.length) {
      return res.status(400).json({ error: 'Your cart is empty.' })
    }
    if (!deliveryDetails?.fullName?.trim()) {
      return res.status(400).json({ error: 'Full name is required.' })
    }
    if (!deliveryDetails?.phone?.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' })
    }
    if (!deliveryDetails?.address?.trim()) {
      return res.status(400).json({ error: 'Delivery address is required.' })
    }
    if (!['mobile-money', 'card', 'cash'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method.' })
    }

    // ── Step 1: Re-fetch prices from DB ──────────────────────────────────────
    const itemIds = items.map((i) => i.itemId)
    const placeholders = itemIds.map(() => '?').join(',')
    const menuItems = db
      .prepare(`SELECT id, name, price_standard, price_special, in_stock FROM menu_items WHERE id IN (${placeholders})`)
      .all(...itemIds)

    const menuMap = Object.fromEntries(menuItems.map((m) => [m.id, m]))

    // ── Step 2: Validate stock and resolve server-side prices ─────────────────
    const verifiedItems = []
    let subtotal = 0

    for (const item of items) {
      const menuItem = menuMap[item.itemId]

      if (!menuItem) {
        return res.status(400).json({ error: `Item ${item.itemId} not found.` })
      }
      if (!menuItem.in_stock) {
        return res.status(400).json({ error: `"${menuItem.name}" is currently out of stock.` })
      }

      // Server decides the price based on the tier the user selected.
      // This prevents price tampering from the frontend.
      const frontendPrice = Number(item.selectedPrice)
      let verifiedPrice

      if (frontendPrice === menuItem.price_special) {
        verifiedPrice = menuItem.price_special
      } else {
        verifiedPrice = menuItem.price_standard // default to standard if anything else
      }

      verifiedItems.push({
        itemId: menuItem.id,
        name: menuItem.name,
        price: verifiedPrice,
        quantity: item.quantity,
      })

      subtotal += verifiedPrice * item.quantity
    }

    const deliveryFee = 10.00
    const totalAmount = +(subtotal + deliveryFee).toFixed(2)

    // ── Cash on delivery: create order immediately ────────────────────────────
    if (paymentMethod === 'cash') {
      const order = createOrder({
        userId: req.user.id,
        verifiedItems,
        totalAmount,
        deliveryFee,
        paymentMethod,
        paymentStatus: 'pending', // paid at door
        deliveryDetails,
      })

      // Emit to Kitchen Display System
      emitToKitchen(io, order, verifiedItems)

      return res.status(201).json({
        message: 'Order placed successfully!',
        orderId: order.id,
        totalAmount,
        paymentMethod: 'cash',
      })
    }

    // ── MoMo / Card: initialize Paystack transaction ──────────────────────────
    const paystackBody = JSON.stringify({
      email: req.user.email,
      amount: Math.round(totalAmount * 100), // Paystack uses pesewas (1 GH₵ = 100 pesewas)
      currency: 'GHS',
      reference: `PEPPERDEM-${Date.now()}-${req.user.id}`,
      callback_url: `${process.env.FRONTEND_URL}/confirmation`,
      metadata: {
        userId: req.user.id,
        verifiedItems: JSON.stringify(verifiedItems),
        deliveryDetails: JSON.stringify(deliveryDetails),
        deliveryFee,
        paymentMethod,
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: deliveryDetails.fullName },
          { display_name: 'Phone', variable_name: 'phone', value: deliveryDetails.phone },
          { display_name: 'Address', variable_name: 'address', value: deliveryDetails.address },
        ],
      },
    })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(paystackBody),
      },
    }

    const paystackReq = https.request(options, (paystackRes) => {
      let data = ''
      paystackRes.on('data', (chunk) => (data += chunk))
      paystackRes.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (!parsed.status) {
            console.error('Paystack error:', parsed.message)
            return res.status(502).json({ error: 'Payment initialization failed. Please try again.' })
          }

          // Store pending order reference (actual order created in webhook after payment)
          res.json({
            message: 'Redirect to payment.',
            authorizationUrl: parsed.data.authorization_url,
            reference: parsed.data.reference,
            totalAmount,
          })
        } catch {
          res.status(502).json({ error: 'Invalid response from payment gateway.' })
        }
      })
    })

    paystackReq.on('error', (err) => {
      console.error('Paystack request error:', err)
      res.status(502).json({ error: 'Could not reach payment gateway.' })
    })

    paystackReq.write(paystackBody)
    paystackReq.end()
  })

  // ── POST /api/checkout/webhook — Paystack payment confirmation ──────────────
  // Paystack calls this URL after a successful payment.
  // IMPORTANT: This route must NOT use requireAuth (it's called by Paystack's servers).
  // Verify the request using the Paystack-Signature header instead.
  router.post('/webhook', async (req, res) => {
    const crypto = (await import('crypto')).default
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex')

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).json({ error: 'Invalid signature.' })
    }

    const event = req.body
    if (event.event !== 'charge.success') {
      // Acknowledge all events, only act on charge.success
      return res.sendStatus(200)
    }

    const { reference, metadata } = event.data

    // Prevent duplicate processing
    const existing = db.prepare('SELECT id FROM orders WHERE paystack_ref = ?').get(reference)
    if (existing) return res.sendStatus(200)

    try {
      const { userId, verifiedItems, deliveryDetails, deliveryFee, paymentMethod } = metadata
      const parsedItems = typeof verifiedItems === 'string' ? JSON.parse(verifiedItems) : verifiedItems
      const parsedDelivery = typeof deliveryDetails === 'string' ? JSON.parse(deliveryDetails) : deliveryDetails
      const totalAmount = +(event.data.amount / 100).toFixed(2) // convert pesewas back to GH₵

      const order = createOrder({
        userId: Number(userId),
        verifiedItems: parsedItems,
        totalAmount,
        deliveryFee: Number(deliveryFee),
        paymentMethod,
        paymentStatus: 'paid',
        paystackRef: reference,
        deliveryDetails: parsedDelivery,
      })

      emitToKitchen(io, order, parsedItems)

      console.log(`✅ Order #${order.id} confirmed via Paystack (ref: ${reference})`)
      res.sendStatus(200)
    } catch (err) {
      console.error('Webhook order creation failed:', err)
      res.sendStatus(500)
    }
  })

  // ── GET /api/checkout/verify/:reference ──────────────────────────────────────
  // Frontend polls this after redirect from Paystack to get the order id.
  router.get('/verify/:reference', requireAuth, (req, res) => {
    const order = db.prepare('SELECT id, status, total_amount FROM orders WHERE paystack_ref = ? AND user_id = ?')
      .get(req.params.reference, req.user.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found or still processing.' })
    }

    res.json({ orderId: order.id, status: order.status, totalAmount: order.total_amount })
  })

  return router
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

/**
 * Creates an order + order_items inside an atomic transaction.
 * Clears the user's cart_items at the same time.
 */
function createOrder({ userId, verifiedItems, totalAmount, deliveryFee, paymentMethod, paymentStatus, paystackRef = null, deliveryDetails }) {
  let createdOrder

  const doCreate = db.transaction(() => {
    const result = db.prepare(`
      INSERT INTO orders (
        user_id, total_amount, delivery_fee, status, payment_method,
        payment_status, paystack_ref, delivery_address, delivery_notes,
        phone, full_name, packaging
      ) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      totalAmount,
      deliveryFee,
      paymentMethod,
      paymentStatus,
      paystackRef,
      deliveryDetails.address,
      deliveryDetails.notes || '',
      deliveryDetails.phone,
      deliveryDetails.fullName,
      deliveryDetails.packaging || 'standard'
    )

    const orderId = result.lastInsertRowid

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, item_id, name_at_purchase, price_at_purchase, quantity)
      VALUES (?, ?, ?, ?, ?)
    `)

    for (const item of verifiedItems) {
      insertItem.run(orderId, item.itemId, item.name, item.price, item.quantity)
    }

    // Clear the cart — the order is now committed
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId)

    createdOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId)
  })

  doCreate()
  return createdOrder
}

/**
 * Emits a `new_order` event to all connected KDS clients in the 'kitchen' room.
 */
function emitToKitchen(io, order, items) {
  const orderItems = db.prepare(`
    SELECT oi.*, m.image_url FROM order_items oi
    JOIN menu_items m ON m.id = oi.item_id
    WHERE oi.order_id = ?
  `).all(order.id)

  io.to('kitchen').emit('new_order', {
    id: order.id,
    status: order.status,
    customerName: order.full_name,
    phone: order.phone,
    address: order.delivery_address,
    notes: order.delivery_notes,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    totalAmount: order.total_amount,
    items: orderItems,
    createdAt: order.created_at,
  })

  console.log(`🍽️  Order #${order.id} sent to kitchen via WebSocket`)
}
