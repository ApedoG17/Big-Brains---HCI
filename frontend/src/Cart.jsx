import './Cart.css'

function Cart({ items, setItems, onBack, onCheckout }) {

  const updateQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter(item => item.id !== id))
  }

  const updatePrice = (id, price) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, price } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const deliveryFee = items.length > 0 ? 10 : 0
  const total = subtotal + deliveryFee

  return (
    <main className="cart-page page-transition">
      <div className="cart-header">
        <div>
          <button type="button" className="back-button" onClick={onBack}>
            ← Back
          </button>
          <span className="cart-eyebrow">Pepper Dem</span>
          <h1>Your Cart</h1>
        </div>

        <button
          type="button"
          className="clear-cart-button"
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear All
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious meals to continue.</p>
          <button type="button" className="btn-primary" onClick={onBack} style={{marginTop: '20px'}}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => {
              // Automatically label price options if there are exactly 2 (assuming sorted desc in data, but let's sort them to be sure)
              const sortedPrices = [...item.priceOptions].sort((a, b) => a - b)
              const hasTwoSizes = sortedPrices.length === 2

              return (
                <article className="cart-item" key={item.id + item.price}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <div className="cart-item-title-row">
                      <h2>{item.name}</h2>
                      <button 
                        type="button" 
                        className="remove-item-btn" 
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>

                    <div className="cart-item-selection">
                      <div className="size-selector">
                        <span className="selection-label">Portion Size:</span>
                        <div className="price-options" aria-label={`Choose a size for ${item.name}`}>
                          {sortedPrices.map((price, idx) => {
                            const sizeLabel = hasTwoSizes ? (idx === 0 ? 'Regular' : 'Large') : `Option ${idx + 1}`
                            return (
                              <button
                                key={price}
                                type="button"
                                className={item.price === price ? 'price-option active' : 'price-option'}
                                onClick={() => updatePrice(item.id, price)}
                              >
                                {sizeLabel} (GH₵ {price})
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="cart-item-bottom">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <strong className="cart-item-total">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

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

            <button
              type="button"
              className="checkout-button"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
