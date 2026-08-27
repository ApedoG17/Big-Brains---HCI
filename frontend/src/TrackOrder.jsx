import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { fetchApi } from './api'
import './TrackOrder.css'

const SOCKET_URL = 'http://localhost:3000'

function TrackOrder({ onBack }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const data = await fetchApi('/orders')
        if (data.orders && data.orders.length > 0) {
          setOrder(data.orders[0]) // Get most recent
        } else {
          setError("You don't have any recent orders.")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLatestOrder()

    const socket = io(SOCKET_URL)
    socket.on('order_updated', ({ orderId, status }) => {
      setOrder(prev => {
        if (prev && prev.id === orderId) {
          return { ...prev, status }
        }
        return prev
      })
    })

    return () => socket.disconnect()
  }, [])

  if (loading) {
    return (
      <main className="track-page">
        <div className="track-header">
          <button type="button" className="back-home-button" onClick={onBack}>← Back</button>
          <h1>Loading your order...</h1>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="track-page">
        <div className="track-header">
          <button type="button" className="back-home-button" onClick={onBack}>← Back</button>
          <h1>Order Tracking</h1>
          <p className="form-error" style={{ marginTop: '1rem' }}>{error || 'Order not found.'}</p>
        </div>
      </main>
    )
  }

  // Determine active states based on current status
  const statuses = ['pending', 'preparing', 'ready', 'delivered'] // simplified for UI progression
  // if cancelled or out-for-delivery, map them appropriately or just use basic indices
  let currentIndex = statuses.indexOf(order.status)
  if (currentIndex === -1) {
    if (order.status === 'confirmed') currentIndex = 0
    if (order.status === 'out-for-delivery') currentIndex = 2
  }

  const getStepClass = (stepIndex) => {
    if (currentIndex === stepIndex) return 'tracking-step active'
    if (currentIndex > stepIndex) return 'tracking-step completed'
    return 'tracking-step'
  }

  const statusMessages = {
    pending: { icon: '✓', title: 'Order placed', desc: 'We have received your order and are confirming it.' },
    confirmed: { icon: '✓', title: 'Order confirmed', desc: 'Your order is confirmed and will be prepared shortly.' },
    preparing: { icon: '🍳', title: 'Preparing your order', desc: "Our kitchen is preparing your meal fresh. We'll let you know when it's ready." },
    ready: { icon: '🛵', title: 'Out for delivery', desc: 'Your rider has picked up the order and is on the way!' },
    'out-for-delivery': { icon: '🛵', title: 'Out for delivery', desc: 'Your rider is on the way!' },
    delivered: { icon: '📍', title: 'Delivered', desc: 'Enjoy your meal!' },
    cancelled: { icon: '❌', title: 'Cancelled', desc: 'This order was cancelled.' }
  }

  const currentMsg = statusMessages[order.status] || statusMessages.pending
  const progressPercent = Math.max(0, Math.min(100, (currentIndex / 3) * 100))

  return (
    <main className="track-page page-transition">
      <div className="track-header">
        <button type="button" className="back-home-button" onClick={onBack}>
          ← Back
        </button>

        <span className="track-eyebrow">Pepper Dem</span>
        <h1>Track your order</h1>
        <p>
          Order <strong>#PD-{order.id}</strong> · Estimated arrival 25–35 mins
        </p>
      </div>

      <section className="tracking-card">
        <div className="tracking-status">
          <div className="status-icon">{currentMsg.icon}</div>
          <div>
            <span className="status-label">Current status</span>
            <h2>{currentMsg.title}</h2>
            <p>{currentMsg.desc}</p>
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-line">
            <span className="progress-fill transition-all" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="tracking-steps">
            <div className={getStepClass(0)}>
              <span>✓</span>
              <strong>Order placed</strong>
            </div>
            <div className={getStepClass(1)}>
              <span>🍳</span>
              <strong>Preparing</strong>
            </div>
            <div className={getStepClass(2)}>
              <span>🛵</span>
              <strong>Out for delivery</strong>
            </div>
            <div className={getStepClass(3)}>
              <span>📍</span>
              <strong>Delivered</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="track-details">
        <div className="delivery-card">
          <span className="card-label">Delivery address</span>
          <h3>{order.delivery_address || 'Pickup'}</h3>
          <p>Your order will be delivered to the address provided at checkout.</p>
        </div>

        <div className="delivery-card">
          <span className="card-label">Estimated arrival</span>
          <h3>25–35 mins</h3>
          <p>We'll notify you when your rider is on the way.</p>
        </div>
      </section>

      <section className="tracked-order-summary">
        <div className="summary-heading">
          <div>
            <span className="card-label">Your order</span>
            <h2>Order summary</h2>
          </div>
          <strong>#PD-{order.id}</strong>
        </div>

        {order.items?.map(item => (
          <div className="tracked-item" key={item.id}>
            <div>
              <strong>{item.name_at_purchase}</strong>
              <span>{item.quantity} × GH₵ {item.price_at_purchase.toFixed(2)}</span>
            </div>
            <strong>GH₵ {(item.price_at_purchase * item.quantity).toFixed(2)}</strong>
          </div>
        ))}

        <div className="tracked-total">
          <span>Total</span>
          <strong>GH₵ {order.total_amount.toFixed(2)}</strong>
        </div>
      </section>
    </main>
  )
}

export default TrackOrder