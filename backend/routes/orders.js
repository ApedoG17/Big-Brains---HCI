/**
 * routes/orders.js
 * GET /api/orders        — list current user's orders (with items)
 * GET /api/orders/:id    — get single order details
 * PATCH /api/orders/:id/status — kitchen staff updates order status
 * GET /api/orders/all    — staff: all orders (for KDS)
 */

import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth, requireStaff } from '../middleware/auth.js'

export default function ordersRouter(io) {
  const router = Router()

  // ── GET /api/orders ─────────────────────────────────────────────────────────
  router.get('/', requireAuth, (req, res) => {
    const orders = db.prepare(`
      SELECT id, total_amount, delivery_fee, status, payment_method,
             payment_status, delivery_address, phone, full_name, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(req.user.id)

    // Attach items to each order
    const getItems = db.prepare(`
      SELECT oi.id, oi.item_id, oi.name_at_purchase, oi.price_at_purchase, oi.quantity, m.image_url
      FROM order_items oi
      JOIN menu_items m ON m.id = oi.item_id
      WHERE oi.order_id = ?
    `)

    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: getItems.all(order.id),
    }))

    res.json({ orders: ordersWithItems })
  })

  // ── GET /api/orders/all — staff only: all orders for KDS ───────────────────
  router.get('/all', requireAuth, requireStaff, (req, res) => {
    const { status, limit = 50 } = req.query

    let query = `
      SELECT o.*, u.name as customer_name_from_account
      FROM orders o
      JOIN users u ON u.id = o.user_id
    `
    const params = []
    if (status) {
      query += ' WHERE o.status = ?'
      params.push(status)
    }
    query += ' ORDER BY o.created_at DESC LIMIT ?'
    params.push(Number(limit))

    const orders = db.prepare(query).all(...params)

    const getItems = db.prepare(`
      SELECT oi.*, m.image_url FROM order_items oi
      JOIN menu_items m ON m.id = oi.item_id
      WHERE oi.order_id = ?
    `)

    const ordersWithItems = orders.map((o) => ({ ...o, items: getItems.all(o.id) }))
    res.json({ orders: ordersWithItems })
  })

  // ── GET /api/orders/:id ─────────────────────────────────────────────────────
  router.get('/:id', requireAuth, (req, res) => {
    const order = db.prepare(`
      SELECT * FROM orders WHERE id = ? AND (user_id = ? OR ? = 'staff')
    `).get(req.params.id, req.user.id, req.user.role)

    if (!order) return res.status(404).json({ error: 'Order not found.' })

    const items = db.prepare(`
      SELECT oi.*, m.image_url FROM order_items oi
      JOIN menu_items m ON m.id = oi.item_id
      WHERE oi.order_id = ?
    `).all(order.id)

    res.json({ order: { ...order, items } })
  })

  // ── PATCH /api/orders/:id/status — kitchen staff updates status ─────────────
  const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']

  router.patch('/:id/status', requireAuth, requireStaff, (req, res) => {
    const { status } = req.body

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` })
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found.' })

    db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?")
      .run(status, order.id)

    // Notify all clients of the status change (so tracking page updates live)
    io.emit('order_updated', { orderId: order.id, status })

    res.json({ message: `Order #${order.id} status updated to "${status}".`, orderId: order.id, status })
  })

  return router
}
