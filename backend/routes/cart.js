/**
 * routes/cart.js
 * POST /api/cart/sync — upsert cart from React local state → DB
 * GET  /api/cart      — fetch user's cart with current menu data
 * DELETE /api/cart    — clear entire cart
 *
 * All routes require a valid JWT.
 */

import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// All cart routes are protected
router.use(requireAuth)

// ── POST /api/cart/sync ───────────────────────────────────────────────────────
// Body: { items: [{ itemId, quantity, selectedPrice }] }
// Strategy: replace the user's entire cart with the incoming state.
// This is safe because React is the source-of-truth for the current session.
router.post('/sync', (req, res) => {
  const { items } = req.body

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: '`items` must be an array.' })
  }

  // Validate items exist in menu
  const menuIds = new Set(
    db.prepare('SELECT id FROM menu_items WHERE in_stock = 1').all().map((r) => r.id)
  )

  for (const item of items) {
    if (!menuIds.has(item.itemId)) {
      return res.status(400).json({ error: `Menu item ${item.itemId} is unavailable.` })
    }
    if (!item.quantity || item.quantity < 1) {
      return res.status(400).json({ error: 'Each item must have a positive quantity.' })
    }
  }

  // Atomically replace cart
  const syncCart = db.transaction(() => {
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id)

    const insert = db.prepare(`
      INSERT INTO cart_items (user_id, item_id, quantity, selected_price, updated_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `)

    for (const item of items) {
      insert.run(req.user.id, item.itemId, item.quantity, item.selectedPrice)
    }
  })

  syncCart()
  res.json({ message: 'Cart synced successfully.', count: items.length })
})

// ── GET /api/cart ─────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  const cartItems = db.prepare(`
    SELECT
      ci.id,
      ci.item_id,
      ci.quantity,
      ci.selected_price,
      ci.updated_at,
      m.name,
      m.category,
      m.price_standard,
      m.price_special,
      m.description,
      m.image_url,
      m.in_stock
    FROM cart_items ci
    JOIN menu_items m ON m.id = ci.item_id
    WHERE ci.user_id = ?
    ORDER BY ci.updated_at DESC
  `).all(req.user.id)

  const subtotal = cartItems.reduce((sum, i) => sum + i.selected_price * i.quantity, 0)
  const deliveryFee = cartItems.length > 0 ? 10 : 0

  res.json({
    items: cartItems,
    subtotal: +subtotal.toFixed(2),
    deliveryFee,
    total: +(subtotal + deliveryFee).toFixed(2),
  })
})

// ── DELETE /api/cart ──────────────────────────────────────────────────────────
router.delete('/', (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id)
  res.json({ message: 'Cart cleared.' })
})

export default router
