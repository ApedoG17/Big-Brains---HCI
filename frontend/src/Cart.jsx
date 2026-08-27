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
    <main className="cart-page">
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
          <h2>Your cart is empty</h2>
          <p>Add some delicious meals to continue.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>GH₵ {item.price.toFixed(2)}</p>

                  <div className="price-options" aria-label={`Choose a price for ${item.name}`}>
                    {item.priceOptions.map((price) => (
                      <button
                        key={price}
                        type="button"
                        className={item.price === price ? 'price-option active' : 'price-option'}
                        onClick={() => updatePrice(item.id, price)}
                      >
                        GH₵ {price.toFixed(2)}
                      </button>
                    ))}
                  </div>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <strong>
                  GH₵ {(item.price * item.quantity).toFixed(2)}
                </strong>
              </article>
            ))}
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
