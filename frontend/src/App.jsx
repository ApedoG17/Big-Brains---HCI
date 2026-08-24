import './App.css'

const navItems = ['Home', 'Menu', 'Offers', 'Contact']

const specialOffers = [
  {
    name: 'Jollof Platter',
    price: 'GH₵ 50.00',
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Waakye Combo',
    price: 'GH₵ 45.00',
    badge: 'Chef special',
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Plain Rice Special',
    price: 'GH₵ 35.00',
    badge: 'Family pack',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
]

const dishCards = [
  { name: 'Jollof', label: 'Spicy & rich', price: 'GH₵ 35.00', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Waakye', label: 'Beans & rice', price: 'GH₵ 30.00', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
  { name: 'Plain Rice', label: 'Classic comfort', price: 'GH₵ 25.00', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fried Rice', label: 'Savory delight', price: 'GH₵ 40.00', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80' },
]

const featureCards = [
  { title: 'Fast delivery', text: 'Hot meals delivered in under 30 mins.' },
  { title: 'Fresh ingredients', text: 'Prepared daily for peak taste and quality.' },
  { title: 'Easy orders', text: 'Quick checkout with flexible delivery options.' },
]

function App() {
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
            <a key={item} href="#" className={item === 'Home' ? 'active' : ''}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="header-btn outline">
            Login
          </button>
          <button type="button" className="header-btn primary">
            Order now
          </button>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero-section">
          <div className="hero-card red-panel">
            <span className="mini-tag">Hot, fresh & ready</span>
            <h1>Hot Jollof, Waakye &amp; Plain Rice — delivered fast.</h1>
            <p>
              Enjoy slow-cooked comfort food made fresh with bold Ghanaian flavours,
              generous portions and quick delivery to your door.
            </p>

            <div className="cta-row">
              <button type="button" className="primary-button">Order now</button>
              <button type="button" className="secondary-button">View menu</button>
            </div>

            <div className="rating-row">
              <span>★ 4.9</span>
              <span>30 min</span>
              <span>2k+ orders</span>
            </div>
          </div>

          {specialOffers.map((offer) => (
            <article key={offer.name} className="offer-card">
              <div className="offer-header">
                <span className="small-tag">{offer.badge}</span>
              </div>
              <div className="offer-content">
                <h2>{offer.name}</h2>
                <div className="offer-meta">
                  <span>{offer.price}</span>
                </div>
                <button type="button" className="mini-button">Add to cart</button>
              </div>
              <img src={offer.image} alt={offer.name} />
            </article>
          ))}
        </section>

        <section className="menu-grid">
          <div className="section-header">
            <div>
              <span className="eyebrow">Pick your plate</span>
              <h3>Choose your favourite meal</h3>
            </div>
            <div className="filter-row">
              <button type="button" className="chip active">All</button>
              <button type="button" className="chip">Jollof</button>
              <button type="button" className="chip">Waakye</button>
              <button type="button" className="chip">Rice</button>
            </div>
          </div>

          <div className="dish-grid">
            {dishCards.map((dish) => (
              <article key={dish.name} className="dish-card">
                <img src={dish.image} alt={dish.name} />
                <div className="dish-body">
                  <span className="dish-name">{dish.name}</span>
                  <p>{dish.label}</p>
                  <div className="dish-footer">
                    <strong>{dish.price}</strong>
                    <button type="button" className="dish-button">Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-row">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-icon">✓</span>
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
