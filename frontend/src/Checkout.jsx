import { useState } from 'react'
import './Checkout.css'

function Checkout({ onBack, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
    packaging: 'standard',
    payment: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your delivery address.'
    }

    if (!formData.payment) {
      newErrors.payment = 'Please select a payment method.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validateForm()) {
      onPlaceOrder()
    }
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <button type="button" className="back-button" onClick={onBack}>
          ← Back to cart
        </button>

        <div>
          <span className="checkout-eyebrow">Pepper Dem</span>
          <h1>Checkout</h1>
          <p>Complete your details and place your order.</p>
        </div>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-form-card">
          <h2>Delivery details</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="form-error">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 024 123 4567"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="form-error">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              placeholder="Enter your delivery address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className="form-error">{errors.address}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              Delivery notes <span>(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Any instructions for the rider?"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Packaging mode</label>

            <div className="option-grid">
              <label className="option-card">
                <input
                  type="radio"
                  name="packaging"
                  value="standard"
                  checked={formData.packaging === 'standard'}
                  onChange={handleChange}
                />
                <span>
                  <strong>Standard</strong>
                  <small>Regular food packaging</small>
                </span>
              </label>

              <label className="option-card">
                <input
                  type="radio"
                  name="packaging"
                  value="eco"
                  checked={formData.packaging === 'eco'}
                  onChange={handleChange}
                />
                <span>
                  <strong>Eco-friendly</strong>
                  <small>Environmentally friendly packaging</small>
                </span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Payment method</label>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="mobile-money"
                  checked={formData.payment === 'mobile-money'}
                  onChange={handleChange}
                />
                Mobile Money
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.payment === 'card'}
                  onChange={handleChange}
                />
                Card
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === 'cash'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>

            {errors.payment && (
              <span className="form-error">{errors.payment}</span>
            )}
          </div>
        </section>

        <aside className="order-summary">
          <span className="summary-eyebrow">Your order</span>
          <h2>Order summary</h2>

          <div className="summary-item">
            <div>
              <strong>Jollof Platter</strong>
              <span>1 × GH₵ 50.00</span>
            </div>
            <strong>GH₵ 50.00</strong>
          </div>

          <div className="summary-item">
            <div>
              <strong>Waakye Combo</strong>
              <span>1 × GH₵ 45.00</span>
            </div>
            <strong>GH₵ 45.00</strong>
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>GH₵ 95.00</strong>
          </div>

          <div className="summary-line">
            <span>Delivery fee</span>
            <strong>GH₵ 10.00</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>GH₵ 105.00</strong>
          </div>

          <button type="submit" className="place-order-button">
            Place order
          </button>
        </aside>
      </form>
    </main>
  )
}

export default Checkout