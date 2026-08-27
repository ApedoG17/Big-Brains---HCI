import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import { fetchApi } from './api'
import './KitchenDisplay.css'

const SOCKET_URL = 'http://localhost:3000'

export default function KitchenDisplay({ onBack, user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    // Make sure audio is initialized via user interaction if needed,
    // we'll just try to play it anyway on new orders
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg')

    if (!user || user.role !== 'staff') {
      setError('Access denied. Staff only.')
      setLoading(false)
      return
    }

    // 1. Fetch existing active orders
    const fetchOrders = async () => {
      try {
        const data = await fetchApi('/orders/all?limit=50')
        // Keep only active orders on the board
        const activeOrders = (data.orders || []).filter(o => 
          ['pending', 'preparing', 'ready'].includes(o.status)
        )
        setOrders(activeOrders)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()

    // 2. Connect to WebSocket
    const socket = io(SOCKET_URL)

    socket.on('connect', () => {
      socket.emit('join_kitchen')
    })

    socket.on('new_order', (order) => {
      // Play alert sound
      audioRef.current?.play().catch(() => {
        // Autoplay may be blocked by browser until user interacts with the page
        console.warn('Could not play notification sound. User interaction required.')
      })
      
      setOrders((prev) => [order, ...prev])
    })

    socket.on('order_updated', ({ orderId, status }) => {
      setOrders((prev) => 
        prev.map((o) => o.id === orderId ? { ...o, status } : o)
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetchApi(`/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      })
      // Local state will update via WebSocket broadcast anyway,
      // but we can proactively update it too for snappiness.
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert(`Failed to update status: ${err.message}`)
    }
  }

  if (error) {
    return (
      <div className="kds-page kds-error">
        <h2>{error}</h2>
        <button onClick={onBack} className="btn-primary">Return Home</button>
      </div>
    )
  }

  return (
    <div className="kds-page page-transition">
      <header className="kds-header">
        <div>
          <button onClick={onBack} className="kds-back-btn">← Exit KDS</button>
          <h1>Kitchen Display System</h1>
        </div>
        <div className="kds-status-indicator">
          <span className="live-dot"></span> Live Updates
        </div>
      </header>

      {loading ? (
        <div className="kds-loading">Loading orders...</div>
      ) : (
        <div className="kds-board">
          <div className="kds-column">
            <h2 className="kds-col-title">Pending ({orders.filter(o => o.status === 'pending').length})</h2>
            <div className="kds-ticket-list">
              {orders.filter(o => o.status === 'pending').map(order => (
                <TicketCard key={order.id} order={order} onUpdate={updateStatus} nextStatus="preparing" nextLabel="Start Preparing" />
              ))}
            </div>
          </div>
          
          <div className="kds-column">
            <h2 className="kds-col-title">Preparing ({orders.filter(o => o.status === 'preparing').length})</h2>
            <div className="kds-ticket-list">
              {orders.filter(o => o.status === 'preparing').map(order => (
                <TicketCard key={order.id} order={order} onUpdate={updateStatus} nextStatus="ready" nextLabel="Mark as Ready" />
              ))}
            </div>
          </div>
          
          <div className="kds-column">
            <h2 className="kds-col-title">Ready ({orders.filter(o => o.status === 'ready').length})</h2>
            <div className="kds-ticket-list">
              {orders.filter(o => o.status === 'ready').map(order => (
                <TicketCard key={order.id} order={order} onUpdate={updateStatus} nextStatus="delivered" nextLabel="Mark Delivered" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TicketCard({ order, onUpdate, nextStatus, nextLabel }) {
  const timeStr = new Date(order.created_at || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
  return (
    <article className="kds-ticket">
      <div className="kds-ticket-header">
        <span className="kds-order-id">#{order.id}</span>
        <span className="kds-time">{timeStr}</span>
      </div>
      <div className="kds-customer-info">
        <strong>{order.customer_name_from_account || order.customerName || 'Customer'}</strong>
        <span>{order.payment_method === 'cash' ? '💵 Cash on Delivery' : '💳 Paid Online'}</span>
      </div>
      
      <ul className="kds-items">
        {order.items?.map((item) => (
          <li key={item.id} className="kds-item">
            <span className="kds-qty">{item.quantity}x</span>
            <span className="kds-item-name">{item.name_at_purchase}</span>
          </li>
        ))}
      </ul>
      
      {order.delivery_notes && (
        <div className="kds-notes">
          <strong>Note:</strong> {order.delivery_notes}
        </div>
      )}

      <button className="kds-action-btn" onClick={() => onUpdate(order.id, nextStatus)}>
        {nextLabel} →
      </button>
    </article>
  )
}
