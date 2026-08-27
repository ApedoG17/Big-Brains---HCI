/**
 * middleware/auth.js — JWT verification middleware
 *
 * Reads the Bearer token from the Authorization header,
 * verifies the signature, and injects req.user = { id, role } into the request.
 *
 * Usage:
 *   import { requireAuth, requireStaff } from '../middleware/auth.js'
 *   router.get('/protected', requireAuth, handler)
 *   router.get('/kitchen', requireAuth, requireStaff, handler)
 */

import jwt from 'jsonwebtoken'

/**
 * Verifies the JWT. Returns 401 if missing or invalid.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided. Please log in.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Inject user info for downstream handlers
    req.user = { id: decoded.id, role: decoded.role, email: decoded.email }
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' })
    }
    return res.status(401).json({ error: 'Invalid token.' })
  }
}

/**
 * Must be used AFTER requireAuth.
 * Blocks non-staff users from accessing KDS routes.
 */
export function requireStaff(req, res, next) {
  if (req.user?.role !== 'staff') {
    return res.status(403).json({ error: 'Access denied. Staff only.' })
  }
  next()
}
