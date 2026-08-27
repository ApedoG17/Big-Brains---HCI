/**
 * server.js — PepperDem REST API Entry Point
 *
 * Architecture:
 *  - Express handles HTTP REST routes
 *  - Socket.IO (mounted on same HTTP server) handles KDS WebSocket channel
 *  - CORS locked to the React dev server (localhost:5173)
 *
 * Start dev server: npm run dev
 */

import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import cors from 'cors'

// Route imports
import authRouter from './routes/auth.js'
import menuRouter from './routes/menu.js'
import cartRouter from './routes/cart.js'
import checkoutRouter from './routes/checkout.js'
import ordersRouter from './routes/orders.js'

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// ── Socket.IO Setup ──────────────────────────────────────────────────────────
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`)

  // KDS tablet joins the 'kitchen' room to receive order broadcasts
  socket.on('join_kitchen', (data) => {
    // In production: verify a staff JWT token passed in data.token here
    socket.join('kitchen')
    console.log(`👨‍🍳 KDS joined kitchen room (socket: ${socket.id})`)
    socket.emit('kitchen_joined', { message: 'Connected to kitchen channel.' })
  })

  socket.on('disconnect', () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`)
  })
})

// ── Express Middleware ───────────────────────────────────────────────────────
app.use(cors({ origin: FRONTEND_URL }))

// Parse raw body for Paystack webhook signature verification BEFORE json()
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }))

// Standard JSON parsing for all other routes
app.use(express.json())

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',     authRouter)
app.use('/api/menu',     menuRouter)
app.use('/api/cart',     cartRouter)
app.use('/api/checkout', checkoutRouter(io))
app.use('/api/orders',   ordersRouter(io))

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PepperDem API',
    timestamp: new Date().toISOString(),
  })
})

// ── 404 Catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` })
})

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error.' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log('')
  console.log('🌶️  PepperDem API running')
  console.log(`   REST: http://localhost:${PORT}/api`)
  console.log(`   WebSocket: ws://localhost:${PORT}`)
  console.log(`   CORS allowed origin: ${FRONTEND_URL}`)
  console.log('')
})
