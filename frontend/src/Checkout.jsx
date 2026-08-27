import { useState, useRef, useMemo, useEffect } from 'react'
import { fetchApi } from './api'
import './Checkout.css'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default Leaflet icon paths in React
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

function LocationMarker({ position, setPosition, updateAddress }) {
  const markerRef = useRef(null)

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await response.json()
      if (data && data.display_name) {
        updateAddress(data.display_name)
      }
    } catch (err) {
      console.error("Geocoding error:", err)
    }
  }

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      fetchAddress(e.latlng.lat, e.latlng.lng)
      map.flyTo(e.latlng, map.getZoom())
    }
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPos = marker.getLatLng()
          setPosition(newPos)
          fetchAddress(newPos.lat, newPos.lng)
        }
      },
    }),
    [setPosition, updateAddress],
  )

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    />
  )
}

function Checkout({ onBack, onPlaceOrder, cartItems, clearCart, user, setShowAuthModal }) {
  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    phone: '',
    address: '',
    notes: '',
    packaging: 'standard',
    payment: 'cash',
  })

  useEffect(() => {
    if (user && !formData.fullName) {
      setFormData(prev => ({ ...prev, fullName: user.name }))
    }
  }, [user])

  const [position, setPosition] = useState({ lat: 5.6037, lng: -0.1870 }) // Default to Accra center
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  
  const [suggestions, setSuggestions] = useState([])
  const [showMap, setShowMap] = useState(false)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    // Try to get user's current location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        (err) => console.log('Geolocation not allowed or failed', err)
      )
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = cartItems.length > 0 ? 10 : 0
  const total = subtotal + deliveryFee

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

  const updateAddressField = (newAddress) => {
    setFormData((prev) => ({ ...prev, address: newAddress }))
    setErrors((prev) => ({ ...prev, address: '' }))
  }

  const handleAddressType = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, address: value }))
    setErrors(prev => ({ ...prev, address: '' }))

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    if (value.trim().length > 2) {
      typingTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`)
          const data = await res.json()
          setSuggestions(data)
        } catch (err) {
          console.error('Failed to fetch suggestions', err)
        }
      }, 500)
    } else {
      setSuggestions([])
    }
  }

  const handleSelectSuggestion = (suggestion) => {
    const lat = parseFloat(suggestion.lat)
    const lon = parseFloat(suggestion.lon)
    setPosition({ lat, lng: lon })
    setFormData(prev => ({ ...prev, address: suggestion.display_name }))
    setSuggestions([])
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
      newErrors.address = 'Please pick a location on the map or enter your address.'
    }

    if (!formData.payment) {
      newErrors.payment = 'Please select a payment method.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApiError(null)

    if (!user) {
      setShowAuthModal(true)
      return
    }

    if (!validateForm()) return

    setLoading(true)
    try {
      const payload = {
        items: cartItems.map(i => ({ itemId: i.id, quantity: i.quantity, selectedPrice: i.price })),
        deliveryDetails: { ...formData, lat: position.lat, lng: position.lng },
        paymentMethod: formData.payment
      }

      const res = await fetchApi('/checkout', {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      clearCart()
      
      if (res.authorizationUrl) {
        window.location.href = res.authorizationUrl
      } else {
        onPlaceOrder() // Navigate to confirmation page
      }
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="checkout-page page-transition">
      <div className="checkout-header">
        <button type="button" className="back-button" onClick={onBack}>
          ← Back to cart
        </button>

        <div>
          <span className="checkout-eyebrow">Pepper Dem</span>
          <h1>Checkout</h1>
          <p>Complete your details and place your order.</p>
          {apiError && <div className="form-error" style={{ padding: '1rem', background: 'rgba(255,0,0,0.1)', marginTop: '1rem', borderRadius: '4px' }}>{apiError}</div>}
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

          <div className="form-group map-group">
            <label>Delivery address</label>
            <div className="address-input-wrapper">
              <input
                id="address"
                type="text"
                placeholder="Type to search your area, street..."
                value={formData.address}
                onChange={handleAddressType}
                autoComplete="off"
              />
              <button 
                type="button" 
                className="toggle-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? 'Hide Map' : '📍 Pick on map'}
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="address-suggestions">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => handleSelectSuggestion(s)}>
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}

            {showMap && (
              <div className="map-container-wrapper" style={{ marginTop: '12px' }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="leaflet-checkout-map">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker position={position} setPosition={setPosition} updateAddress={updateAddressField} />
                </MapContainer>
                <small className="map-hint" style={{ marginTop: '8px' }}>Drag the pin to auto-fill your address.</small>
              </div>
            )}
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
              placeholder="Any instructions for the rider? (e.g. Leave at the gate)"
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
                  value="cash"
                  checked={formData.payment === 'cash'}
                  onChange={handleChange}
                />
                Pay on Delivery
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

          {cartItems.map((item) => (
            <div className="summary-item" key={item.id + item.price}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.quantity} × GH₵ {item.price.toFixed(2)}</span>
              </div>
              <strong>GH₵ {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>GH₵ {subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-line">
            <span>Delivery fee</span>
            <strong>GH₵ {deliveryFee.toFixed(2)}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>GH₵ {total.toFixed(2)}</strong>
          </div>

          <button type="submit" className="place-order-button" disabled={loading || cartItems.length === 0}>
            {loading ? 'Processing...' : 'Place order'}
          </button>
          
          {!user && (
            <p style={{ textAlign: 'center', margin: '1.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              You will be prompted to log in or sign up securely before placing your order.
            </p>
          )}
        </aside>
      </form>
    </main>
  )
}

export default Checkout