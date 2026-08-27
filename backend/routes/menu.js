/**
 * routes/menu.js
 * GET /api/menu — returns all in-stock menu items grouped by category
 */

import { Router } from 'express'
import db from '../db/database.js'

const router = Router()

// ── GET /api/menu ─────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  const items = db.prepare(`
    SELECT
      id,
      name,
      category,
      price,
      price_standard,
      price_special,
      description,
      image_url,
      in_stock,
      badge
    FROM menu_items
    WHERE in_stock = 1
    ORDER BY category, id
  `).all()

  // Group by category for convenient frontend consumption
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  res.json({ items, grouped })
})

// ── GET /api/menu/all (admin — includes out-of-stock items) ──────────────────
router.get('/all', (req, res) => {
  const items = db.prepare('SELECT * FROM menu_items ORDER BY category, id').all()
  res.json({ items })
})

// ── PATCH /api/menu/:id/stock — toggle in_stock (simple admin endpoint) ──────
router.patch('/:id/stock', (req, res) => {
  const { id } = req.params
  const { in_stock } = req.body

  if (in_stock === undefined || ![0, 1].includes(Number(in_stock))) {
    return res.status(400).json({ error: 'in_stock must be 0 or 1.' })
  }

  const item = db.prepare('SELECT id FROM menu_items WHERE id = ?').get(id)
  if (!item) return res.status(404).json({ error: 'Menu item not found.' })

  db.prepare('UPDATE menu_items SET in_stock = ? WHERE id = ?').run(Number(in_stock), id)
  res.json({ message: 'Stock status updated.' })
})

export default router
