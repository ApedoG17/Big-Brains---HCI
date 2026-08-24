import Button from './Button.jsx';
import './OrderConfirmed.css';

/**
 * Order Confirmed screen.
 * `orderId` and `etaMinutes` come from the order just placed;
 * `items` is the list of ordered dishes: [{ name, quantity }]
 */
export default function OrderConfirmed({
  orderId = 'PD-2026-0819-042',
  etaMinutes = [25, 35],
  items = [
    { name: 'Jollof Rice Special', quantity: 2 },
    { name: 'Waakye Special', quantity: 1 },
    { name: 'Sobolo Drink', quantity: 3 },
  ],
  onTrackOrder,
  onBackToHome,
}) {
  return (
    <div className="pd-screen pd-order-confirmed">
      <div className="pd-order-confirmed__check">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#1d1d1d" strokeWidth="2" />
          <path d="M15 24l6 6 12-13" stroke="#1d1d1d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="pd-order-confirmed__title">Order Confirmed!</h1>
      <p className="pd-order-confirmed__id">Order #{orderId}</p>
      <p className="pd-order-confirmed__eta">
        Est. Delivery: {etaMinutes[0]} - {etaMinutes[1]} minutes
      </p>

      <div className="pd-order-confirmed__divider" />

      <ul className="pd-order-confirmed__items">
        {items.map((item) => (
          <li key={item.name}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <div className="pd-order-confirmed__divider" />

      <div className="pd-order-confirmed__actions">
        <Button variant="dark" onClick={onTrackOrder}>
          Track Order
        </Button>
        <Button variant="secondary" onClick={onBackToHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}