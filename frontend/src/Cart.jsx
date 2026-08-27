import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Cart.css'

function Cart({ items, updateQuantity, clearCart, onCheckout, isOpen, onClose }) {
  const overlayRef = useRef(null)
  const drawerRef = useRef(null)

  // GSAP Animation
  useGSAP(() => {
    if (isOpen) {
      // Open animation
      overlayRef.current.style.display = 'block'
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(drawerRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' })
    } else {
      // Close animation
      gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' })
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none'
        }
      })
    }
  }, [isOpen])

  // Swipe to close logic
  let touchStartX = 0

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    if (touchEndX - touchStartX > 50) {
      onClose()
    }
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = items.length > 0 ? 10 : 0
  const total = subtotal + deliveryFee

  return (
    <>
      <div 
        ref={overlayRef}
        className="cart-overlay" 
        onClick={onClose}
        style={{ display: 'none', opacity: 0 }} 
      />

      <aside 
        ref={drawerRef}
        id="cartDrawer" 
        className="cart-drawer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="cart-header">
          <div className="cart-header-left">
            <span className="cart-eyebrow">Pepper Dem</span>
            <h1>Your Cart</h1>
            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              Clear All
            </button>
          </div>
          <button type="button" className="cart-close-btn" onClick={onClose} aria-label="Close Cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious meals to continue.</p>
          </div>
        ) : (
          <>
            <div className="cart-body">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p>GH₵ {item.price.toFixed(2)}</p>

                    <div className="quantity-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <strong className="cart-item-total">GH₵ {(item.price * item.quantity).toFixed(2)}</strong>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>GH₵ {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery fee</span>
                <span>GH₵ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>GH₵ {total.toFixed(2)}</strong>
              </div>

              <button type="button" className="checkout-button" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default Cart
