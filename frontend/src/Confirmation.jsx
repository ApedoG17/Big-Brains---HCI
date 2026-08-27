import './Confirmation.css'

function Confirmation({ onBack, onTrackOrder, onHome }) {
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="confirmation-icon">✓</div>

        <span className="confirmation-eyebrow">
          Pepper Dem
        </span>

        <h1>Order confirmed!</h1>

        <p className="confirmation-message">
          Your order has been received and is being prepared.
          We'll get your delicious meal to you soon.
        </p>

        <div className="order-number">
          <span>Order number</span>
          <strong>#PD-2048</strong>
        </div>

        <div className="confirmation-details">
          <div>
            <span>Estimated delivery</span>
            <strong>25–35 mins</strong>
          </div>

          <div>
            <span>Delivery address</span>
            <strong>Accra, Ghana</strong>
          </div>

          <div>
            <span>Total paid</span>
            <strong>GH₵ 105.00</strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            className="back-confirmation-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            type="button"
            className="track-order-button"
            onClick={onTrackOrder}
          >
            Track order
          </button>

          <button
            type="button"
            className="home-button"
            onClick={onHome}
          >
            Back to home
          </button>
        </div>
      </section>
    </main>
  )
}

export default Confirmation