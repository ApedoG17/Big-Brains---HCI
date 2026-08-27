import './TrackOrder.css'

function TrackOrder({ onBack }) {
  return (
    <main className="track-page">
      <div className="track-header">
        <button type="button" className="back-home-button" onClick={onBack}>
          ← Back
        </button>

        <span className="track-eyebrow">Pepper Dem</span>

        <h1>Track your order</h1>

        <p>
          Order <strong>#PD-2048</strong> · Estimated arrival 25–35 mins
        </p>
      </div>

      <section className="tracking-card">
        <div className="tracking-status">
          <div className="status-icon">🍳</div>

          <div>
            <span className="status-label">Current status</span>
            <h2>Preparing your order</h2>
            <p>
              Our kitchen is preparing your meal fresh. We'll let you know
              when your rider is on the way.
            </p>
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-line">
            <span className="progress-fill" />
          </div>

          <div className="tracking-steps">
            <div className="tracking-step completed">
              <span>✓</span>
              <strong>Order placed</strong>
            </div>

            <div className="tracking-step active">
              <span>🍳</span>
              <strong>Preparing</strong>
            </div>

            <div className="tracking-step">
              <span>🛵</span>
              <strong>Out for delivery</strong>
            </div>

            <div className="tracking-step">
              <span>📍</span>
              <strong>Delivered</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="track-details">
        <div className="delivery-card">
          <span className="card-label">Delivery address</span>
          <h3>Accra, Ghana</h3>
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

          <strong>#PD-2048</strong>
        </div>

        <div className="tracked-item">
          <div>
            <strong>Jollof Platter</strong>
            <span>1 × GH₵ 50.00</span>
          </div>

          <strong>GH₵ 50.00</strong>
        </div>

        <div className="tracked-item">
          <div>
            <strong>Waakye Combo</strong>
            <span>1 × GH₵ 45.00</span>
          </div>

          <strong>GH₵ 45.00</strong>
        </div>

        <div className="tracked-total">
          <span>Total</span>
          <strong>GH₵ 105.00</strong>
        </div>
      </section>
    </main>
  )
}

export default TrackOrder