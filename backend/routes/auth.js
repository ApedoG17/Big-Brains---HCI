/**
 * routes/auth.js
 * POST /api/auth/register  — create account, return JWT
 * POST /api/auth/login     — verify credentials, return JWT
 * GET  /api/auth/me        — return current user info (requires auth)
 */

import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

/** Helper — signs a JWT for a user row */
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name?.trim())     return res.status(400).json({ error: 'Name is required.' })
  if (!email?.trim())    return res.status(400).json({ error: 'Email is required.' })
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  const normalizedEmail = email.toLowerCase().trim()

  // Check for existing account
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail)
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }

  const passwordHash = bcrypt.hashSync(password, 10)

  const result = db.prepare(`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, 'customer')
  `).run(name.trim(), normalizedEmail, passwordHash)

  const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(result.lastInsertRowid)
  const token = signToken(user)

  res.status(201).json({
    message: 'Account created successfully.',
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim())

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = signToken(user)

  res.json({
    message: 'Login successful.',
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  res.json({ user })
})

export default router
