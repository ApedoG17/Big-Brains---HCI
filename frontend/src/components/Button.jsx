import './Button.css';

/**
 * Shared Button component.
 *
 * variant:
 *   'primary'   - solid orange gradient, filled (main CTAs: Add to Cart, Place Order)
 *   'secondary' - outlined, white/transparent (secondary actions: Back to Home)
 *   'dark'      - solid black (used for selected states / high-emphasis actions like Track Order)
 *   'chip'      - small pill toggle (Spice Level, Protein Choice, Packaging Mode)
 *
 * active: for 'chip' variant, marks the selected option
 * fullWidth: stretches the button to fill its container (used for main CTAs)
 */
export default function Button({
  children,
  variant = 'primary',
  active = false,
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
}) {
  const classNames = [
    'pd-button',
    `pd-button--${variant}`,
    active ? 'pd-button--active' : '',
    fullWidth ? 'pd-button--full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}