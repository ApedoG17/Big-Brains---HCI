import { useState } from 'react'
import './App.css'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import TrackOrder from './TrackOrder'

// ─── Image Imports ────────────────────────────────────────────────────────────
import imgHero from './assets/plain rice combo.jpeg'
import imgJollofCombo from './assets/jollof combo.jpeg'
import imgWaakyeCombo from './assets/waakye combo.jpeg'
import imgPlainRiceCombo from './assets/plain rice combo.jpeg'

// ─── Data ────────────────────────────────────────────────────────────────────

const jollofDishes = [
  {
    id: 1,
    name: 'Jollof',
    badge: 'SPECIAL',
    priceOptions: [75, 50],
    desc: 'A full Jollof platter with spaghetti, mixed salad, egg, sausage and plantain, served with both fish and meat.',
    image: imgJollofCombo,
  },
]

const waakyeDishes = [
  {
    id: 4,
    name: 'Waakye',
    badge: 'SPECIAL',
    priceOptions: [75, 50],
    desc: 'Premium waakye loaded with spaghetti, salad, gari, egg, wele, sausage and ripe plantain, plus your protein.',
    image: imgWaakyeCombo,
  },
]

const plainRiceDishes = [
  {
    id: 6,
    name: 'Plain Rice',
    badge: 'SPECIAL',
    priceOptions: [75, 50],
    desc: 'Loaded plain rice with spaghetti, egg, sausage and plantain, paired with both fish and chicken.',
    image: imgPlainRiceCombo,
  },
]

const allDishes = [
  ...jollofDishes,
  ...waakyeDishes,
  ...plainRiceDishes,
]

// ─── Shared Components ────────────────────────────────────────────────────────

function Logo({ onClick }) {
  return (
    <button type="button" className="logo-btn" onClick={onClick} aria-label="Go to home">
      <span className="logo-icon">🌶</span>
      <span className="logo-text">PEPPERDEM</span>
    </button>
  )
}

function Navbar({ cartCount, onCartClick, onNavClick, activePage }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <button type="button" className="logo-btn" onClick={() => { onNavClick('home'); setMobileOpen(false) }} aria-label="Go to home">
          <span className="logo-icon">🌶</span>
          <span className="logo-text">PEPPERDEM</span>
        </button>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#" className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavClick('home') }}>Home</a>
          <a href="#" className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavClick('contact') }}>Contact</a>
        </nav>

        {/* Right side */}
        <div className="nav-right">
          <a href="tel:+233501214499" className="nav-phone">📞 +233 50 121 4499</a>
          <button
            type="button"
            className="cart-btn"
            onClick={onCartClick}
            aria-label={`Cart with ${cartCount} items`}
          >
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          <a href="#" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); onNavClick('home'); setMobileOpen(false) }}>Home</a>
          <a href="#" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); onNavClick('contact'); setMobileOpen(false) }}>Contact</a>
          <div className="nav-mobile-actions">
            <a href="tel:+233501214499" className="nav-mobile-phone">📞 +233 50 121 4499</a>
            <button type="button" className="cart-btn" onClick={() => { onCartClick(); setMobileOpen(false) }}>
              🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <div className="dish-card-img-wrap">
        <img src={dish.image} alt={dish.name} className="dish-card-img" />
        <span className={`dish-badge ${dish.badgeType === 'standard' ? 'badge-standard' : 'badge-special'}`}>
          ★ {dish.badge}
        </span>
      </div>
      <div className="dish-card-body">
        <div className="dish-card-top">
          <h3 className="dish-card-name">{dish.name}</h3>
          <span className="dish-card-price">Choose price in cart</span>
        </div>
        <p className="dish-card-desc">{dish.desc}</p>
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => onAdd(dish)}
        >
          Add to Cart +
        </button>
      </div>
    </article>
  )
}

function Footer({ onNav }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">
            <span className="logo-icon" style={{ fontSize: '1.4rem' }}>🌶</span>
            <span className="footer-logo-text">PEPPERDEM</span>
          </div>
          <p className="footer-tagline">
            Authentic Ghanaian comfort food, cooked fresh and delivered hot. Open every day, 8am – 10pm.
          </p>
          {/* Social / Contact Icons */}
          <div className="footer-socials">
            <a href="https://wa.me/233501214499" target="_blank" rel="noopener noreferrer" className="footer-social-btn footer-social-wa" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="tel:+233501214499" className="footer-social-btn footer-social-phone" aria-label="Call us">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </a>
            <a href="mailto:hello@pepperdem.net" className="footer-social-btn footer-social-email" aria-label="Email us">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
            <a href="https://maps.google.com/?q=Accra+Ghana" target="_blank" rel="noopener noreferrer" className="footer-social-btn footer-social-maps" aria-label="Find us on Maps">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">CONTACT</h4>
          <ul className="footer-list">
            <li><a href="tel:+233501214499" className="footer-link">📞 +233 50 121 4499</a></li>
            <li><a href="https://wa.me/233501214499" target="_blank" rel="noopener noreferrer" className="footer-link">💬 WhatsApp us</a></li>
            <li><a href="mailto:hello@pepperdem.net" className="footer-link">✉️ hello@pepperdem.net</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">VISIT US</h4>
          <ul className="footer-list">
            <li><a href="https://maps.google.com/?q=Accra+Ghana" target="_blank" rel="noopener noreferrer" className="footer-link">📍 Visit our restaurant</a></li>
            <li>🚗 We deliver to your location</li>
            <li>Accra, Ghana</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">HOURS</h4>
          <ul className="footer-list">
            <li>Mon – Sun</li>
            <li>8:00 AM – 10:00 PM</li>
            <li>Always fresh, always hot</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Pepper Dem. All rights reserved.</span>
        <span>Made with ♥ in Ghana</span>
      </div>
    </footer>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onAdd, onCartClick, cartCount, onNav }) {
  return (
    <div className="page">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} onNavClick={onNav} activePage="home" />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🇬🇭 Ghana's favourite kitchen</span>
          <h1 className="hero-title">
            Hot Jollof, Waakye<br />
            &amp; Plain Rice —<br />
            delivered fast.
          </h1>
          <p className="hero-desc">
            Freshly cooked Ghanaian meals loaded with the extras — spaghetti, salad, egg,
            plantain and your choice of protein. Order in minutes. Eat in comfort.
          </p>
          <div className="hero-cta">
            <button type="button" className="btn-primary" onClick={() => onCartClick()}>
              Order Now →
            </button>
            <button
              type="button"
              className="btn-outline-white"
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">4.9★</span>
              <span className="stat-label">Customer rating</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">30 min</span>
              <span className="stat-label">Avg. delivery</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">2k+</span>
              <span className="stat-label">Orders served</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={imgHero}
            alt="Delicious Ghanaian food"
          />
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section" id="menu-section">
        <div className="section-eyebrow">OUR MENU</div>
        <h2 className="section-title">Pick your plate</h2>
        <p className="section-desc">
          Every meal comes loaded with the classic Pepper Dem extras. Choose
          a size, choose a protein, and we'll handle the rest.
        </p>

        <div className="dish-grid">
          {allDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon feature-icon-orange">🚀</div>
            <h3 className="feature-title">Fast delivery</h3>
            <p className="feature-text">
              Hot meals at your door in about 30 minutes from the kitchen across the city.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon feature-icon-red">🍽️</div>
            <h3 className="feature-title">Loaded plates</h3>
            <p className="feature-text">
              Every order packed with spaghetti, salad, egg, plantain &amp; protein.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon feature-icon-green">💳</div>
            <h3 className="feature-title">MoMo or cash</h3>
            <p className="feature-text">
              Pay easily with Mobile Money or cash on delivery — your choice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner-left">
          <h2 className="cta-title">Hungry right now?</h2>
          <p className="cta-sub">Call us and we'll get your plate moving.</p>
        </div>
        <a href="tel:+233501214499" className="cta-phone-btn">
          📞 +233 50 121 4499
        </a>
      </section>

      <Footer />
    </div>
  )
}

// ─── Category Page (Jollof / Waakye / Plain Rice) ─────────────────────────────

const categoryConfig = {
  jollof: {
    label: 'Jollof, done right',
    featured: {
      badge: 'SPECIAL OFFER',
      name: 'Jollof Platter',
      priceOptions: [75, 50],
      desc: 'A full Jollof platter with spaghetti, mixed salad, egg, sausage and plantain, served with both fish and meat — our most loaded plate.',
      image: imgJollofCombo,
    },
    rangeTitle: 'All Jollof dishes',
    dishes: jollofDishes,
  },
  waakye: {
    label: 'Waakye, done right',
    featured: {
      badge: 'SPECIAL OFFER',
      name: 'Waakye Combo',
      priceOptions: [75, 50],
      desc: 'A premium waakye combo loaded with spaghetti, salad, gari, wele, sausage and ripe plantain, plus your choice of meat, fish or chicken.',
      image: imgWaakyeCombo,
    },
    rangeTitle: 'All Waakye dishes',
    dishes: waakyeDishes,
  },
  'plain-rice': {
    label: 'Plain Rice, done right',
    featured: {
      badge: 'SPECIAL OFFER',
      name: 'Plain Rice Special',
      priceOptions: [75, 50],
      desc: 'Loaded plain rice with spaghetti, mixed salad, egg, sausage and plantain, paired with fish and chicken for a complete, indulgent meal.',
      image: imgPlainRiceCombo,
    },
    rangeTitle: 'All Plain Rice dishes',
    dishes: plainRiceDishes,
  },
}

function CategoryPage({ category, onAdd, onCartClick, cartCount, onNav }) {
  const config = categoryConfig[category]
  const [featuredIdx, setFeaturedIdx] = useState(0)

  return (
    <div className="page">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} onNavClick={onNav} activePage={category} />

      {/* Category Header */}
      <section className="cat-header">
        <div className="section-eyebrow">SPECIAL OFFERS</div>
        <h1 className="cat-title">{config.label}</h1>
      </section>

      {/* Featured Carousel */}
      <section className="featured-section">
        <div className="featured-card">
          <div className="featured-left">
            <span className="featured-badge">{config.featured.badge}</span>
            <h2 className="featured-name">{config.featured.name}</h2>
            <div className="featured-pricing">
              <span className="featured-price">Choose price in cart</span>
            </div>
            <p className="featured-desc">{config.featured.desc}</p>
            <button type="button" className="btn-primary" onClick={() => onAdd({ ...config.featured, id: `feat-${category}` })}>
              Order Now →
            </button>
          </div>
          <div className="featured-right">
            <img src={config.featured.image} alt={config.featured.name} className="featured-img" />
          </div>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous"
            onClick={() => setFeaturedIdx(Math.max(0, featuredIdx - 1))}
          >‹</button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            aria-label="Next"
            onClick={() => setFeaturedIdx(Math.min(2, featuredIdx + 1))}
          >›</button>
        </div>
        <div className="carousel-dots">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${featuredIdx === i ? 'dot-active' : ''}`}
              onClick={() => setFeaturedIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="range-section">
        <div className="section-eyebrow">THE FULL RANGE</div>
        <h2 className="section-title">{config.rangeTitle}</h2>
        <div className={`dish-grid dish-grid-${config.dishes.length <= 2 ? 'two' : 'three'}`}>
          {config.dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Contact Page ────────────────────────────────────────────────────────────

function ContactPage({ onCartClick, cartCount, onNav }) {
  return (
    <div className="page">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} onNavClick={onNav} activePage="contact" />

      <div className="contact-split">

        {/* ── LEFT PANEL ── */}
        <div className="contact-left">
          {/* Hero text */}
          <div className="contact-left-hero">
            <div className="contact-eyebrow">GET IN TOUCH</div>
            <h1 className="contact-title">We'd love to<br />hear from you</h1>
            <p className="contact-subtitle">
              Reach us on WhatsApp, call us, send an email,
              or follow us on social. We're here every day, 8 AM – 10 PM.
            </p>
          </div>

          {/* Contact cards — stacked */}
          <div className="contact-cards">

            {/* WhatsApp */}
            <a href="https://wa.me/233501214499" target="_blank" rel="noopener noreferrer"
              className="contact-card contact-card-wa">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>WhatsApp</h3>
                <span className="contact-card-value">+233 50 121 4499</span>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>

            {/* Telephone */}
            <a href="tel:+233501214499" className="contact-card contact-card-phone">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Telephone</h3>
                <span className="contact-card-value">+233 50 121 4499</span>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>

            {/* Email */}
            <a href="mailto:hello@pepperdem.net" className="contact-card contact-card-email">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Email</h3>
                <span className="contact-card-value">hello@pepperdem.net</span>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/pepperdem" target="_blank" rel="noopener noreferrer"
              className="contact-card contact-card-instagram">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Instagram</h3>
                <span className="contact-card-value">@pepperdem</span>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>

            {/* Snapchat */}
            <a href="https://snapchat.com/add/pepperdem" target="_blank" rel="noopener noreferrer"
              className="contact-card contact-card-snap">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.878 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Snapchat</h3>
                <span className="contact-card-value">@pepperdem</span>
              </div>
              <div className="contact-card-arrow">→</div>
            </a>

            {/* Location */}
            <div className="contact-card contact-card-location">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Location</h3>
                <span className="contact-card-value">Accra, Ghana</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT PANEL — Map ── */}
        <div className="contact-right">
          <div className="contact-map-wrap">
            <h2 className="contact-map-title">Find us here</h2>
            <div className="contact-map-frame">
              <iframe
                title="Pepper Dem Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127332.83640484716!2d-0.2699999!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1693000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary contact-directions-btn"
            >
              🗺️ Get Directions
            </a>
          </div>
        </div>

      </div>

      <Footer onNav={onNav} />
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────

function App() {
  const [screen, setScreen] = useState('home')
  const [, setScreenHistory] = useState([])
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  const navigateTo = (nextScreen) => {
    setScreenHistory((previous) => [...previous, screen])
    setScreen(nextScreen)
  }

  const goBack = () => {
    setScreenHistory((previous) => {
      if (previous.length === 0) return previous

      setScreen(previous[previous.length - 1])
      return previous.slice(0, -1)
    })
  }

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, { ...item, price: item.priceOptions[0], quantity: 1 }]
    })
    navigateTo('cart')
  }

  const goHome = () => {
    setScreen('home')
    setScreenHistory([])
  }

  if (screen === 'cart')
    return <Cart items={cartItems} setItems={setCartItems} onBack={goBack} onCheckout={() => navigateTo('checkout')} />
  if (screen === 'checkout')
    return <Checkout onBack={goBack} onPlaceOrder={() => navigateTo('confirmation')} />
  if (screen === 'confirmation')
    return <Confirmation onBack={goBack} onTrackOrder={() => navigateTo('track')} onHome={goHome} />
  if (screen === 'track')
    return <TrackOrder onBack={goBack} />

  if (screen === 'contact')
    return (
      <ContactPage
        onCartClick={() => navigateTo('cart')}
        cartCount={cartCount}
        onNav={navigateTo}
      />
    )

  const catPages = ['jollof', 'waakye', 'plain-rice']
  if (catPages.includes(screen)) {
    return (
      <CategoryPage
        category={screen}
        onAdd={addToCart}
        onCartClick={() => navigateTo('cart')}
        cartCount={cartCount}
        onNav={navigateTo}
      />
    )
  }

  return (
    <HomePage
      onAdd={addToCart}
      onCartClick={() => navigateTo('cart')}
      cartCount={cartCount}
      onNav={navigateTo}
    />
  )
}

export default App
