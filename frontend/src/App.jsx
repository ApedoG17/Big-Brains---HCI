import { useState } from 'react'
import './App.css'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import TrackOrder from './TrackOrder'

const navItems = ['Home', 'Menu', 'Offers', 'Contact']

const specialOffers = [
  {
    id: 1,
    name: 'Jollof Platter',
    price: 50,
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Waakye Combo',
    price: 45,
    badge: 'Chef special',
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Plain Rice Special',
    price: 35,
    badge: 'Family pack',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
]

const dishCards = [
  {
    id: 4,
    name: 'Jollof',
    label: 'Spicy & rich',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Waakye',
    label: 'Beans & rice',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Plain Rice',
    label: 'Classic comfort',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: 'Fried Rice',
    label: 'Savory delight',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
  },
]

const featureCards = [
  {
    title: 'Fast delivery',
    text: 'Hot meals delivered in under 30 mins.',
  },
  {
    title: 'Fresh ingredients',
    text: 'Prepared daily for peak taste and quality.',
  },
  {
    title: 'Easy orders',
    text: 'Quick checkout with flexible delivery options.',
  },
]

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ]
    })

    setCurrentScreen('cart')
  }

  const goHome = () => {
    setCurrentScreen('home')
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  if (currentScreen === 'cart') {
    return (
      <Cart
        items={cartItems}
        setItems={setCartItems}
        onCheckout={() => setCurrentScreen('checkout')}
      />
    )
  }

  if (currentScreen === 'checkout') {
    return (
      <Checkout
        onBack={() => setCurrentScreen('cart')}
        onPlaceOrder={() => setCurrentScreen('confirmation')}
      />
    )
  }

  if (currentScreen === 'confirmation') {
    return (
      <Confirmation
        onTrackOrder={() => setCurrentScreen('track')}
        onHome={goHome}
      />
    )
  }

  if (currentScreen === 'track') {
    return <TrackOrder onHome={goHome} />
  }

  return (
    <div className="restaurant-page">
      <header className="site-header">
        <div className="brand-wrap">
          <div className="brand-mark">P</div>

          <div className="brand-copy">
            <span className="brand-name">Pepper Dem</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={item === 'Home' ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault()

                if (item === 'Home') {
                  setCurrentScreen('home')
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                } else {
                  scrollToSection(item.toLowerCase())
                }
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-btn outline"
            onClick={() => alert('Login feature coming soon!')}
          >
            Login
          </button>

          <button
            type="button"
            className="header-btn primary"
            onClick={() => setCurrentScreen('cart')}
          >
            Order now
          </button>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero-section">
          <div className="hero-card red-panel">
            <span className="mini-tag">Hot, fresh & ready</span>

            <h1>
              Authentic Ghanaian
              <br />
              comfort food.
            </h1>

            <p>
              Enjoy slow-cooked comfort food made fresh with bold Ghanaian
              flavours, generous portions and quick delivery to your door.
            </p>

            <div className="cta-row">
              <button
                type="button"
                className="primary-button"
                onClick={() => setCurrentScreen('cart')}
              >
                Order now
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => scrollToSection('menu')}
              >
                View menu
              </button>
            </div>

            <div className="rating-row">
              <span>★ 4.9</span>
              <span>1,200+ happy customers</span>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80"
              alt="Delicious Ghanaian rice meal"
            />

            <div className="hero-image-label">
              <strong>Made with love</strong>
              <span>Authentic Ghanaian flavours</span>
            </div>
          </div>
        </section>

        <section className="offers-section" id="offers">
          <div className="section-heading">
            <div>
              <span className="section-tag">Today's favourites</span>
              <h2>Special offers</h2>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => scrollToSection('menu')}
            >
              View all →
            </button>
          </div>

          <div className="offer-grid">
            {specialOffers.map((offer) => (
              <article className="offer-card" key={offer.id}>
                <div className="offer-image-wrap">
                  <img src={offer.image} alt={offer.name} />
                  <span className="offer-badge">{offer.badge}</span>
                </div>

                <div className="offer-content">
                  <div>
                    <h3>{offer.name}</h3>
                    <p>Freshly prepared and packed with flavour.</p>
                  </div>

                  <div className="offer-bottom">
                    <strong>GH₵ {offer.price}</strong>

                    <button
                      type="button"
                      className="small-order-button"
                      onClick={() => addToCart(offer)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="section-tag">Our menu</span>
              <h2>Choose your favourite</h2>
            </div>

            <p>Good food. Big portions. Zero stress.</p>
          </div>

          <div className="dish-grid">
            {dishCards.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <img src={dish.image} alt={dish.name} />

                <div className="dish-content">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.label}</p>
                  </div>

                  <div className="dish-footer">
                    <strong>GH₵ {dish.price}</strong>

                    <button
                      type="button"
                      className="add-button"
                      onClick={() => addToCart(dish)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading centered">
            <span className="section-tag">Why Pepper Dem?</span>
            <h2>Food made simple</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-number">0{index + 1}</div>

                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="order-banner" id="contact">
          <div>
            <span className="section-tag">Ready to eat?</span>

            <h2>Your next favourite meal is just one click away.</h2>

            <p>
              Order your favourite Ghanaian meals and enjoy them wherever you
              are.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => setCurrentScreen('cart')}
          >
            Start your order
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand-mark">P</div>

          <div>
            <strong>Pepper Dem</strong>
            <p>Authentic Ghanaian comfort food.</p>
          </div>
        </div>

        <div className="footer-links">
          <a href="#menu" onClick={(e) => {
            e.preventDefault()
            scrollToSection('menu')
          }}>
            Menu
          </a>

          <a href="#offers" onClick={(e) => {
            e.preventDefault()
            scrollToSection('offers')
          }}>
            Offers
          </a>

          <a href="#contact" onClick={(e) => {
            e.preventDefault()
            scrollToSection('contact')
          }}>
            Contact
          </a>
        </div>

        <p className="copyright">
          © 2026 Pepper Dem. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App