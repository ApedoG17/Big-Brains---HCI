import './Cart.css'

function Cart({ items, setItems, onCheckout }) {
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