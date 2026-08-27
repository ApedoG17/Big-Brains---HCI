-- ─────────────────────────────────────────────────────────────────────────────
-- PepperDem Schema — SQLite
-- Run once during first-time setup (seed.js handles this automatically)
-- ─────────────────────────────────────────────────────────────────────────────

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL DEFAULT 'customer', -- 'customer' | 'staff'
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Menu Items ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT    NOT NULL,
  category  TEXT    NOT NULL, -- 'jollof' | 'waakye' | 'plain-rice' | 'drinks'
  price     REAL    NOT NULL, -- default / base price (GH₵)
  price_standard REAL NOT NULL DEFAULT 50.00,
  price_special  REAL NOT NULL DEFAULT 75.00,
  description TEXT,
  image_url TEXT,
  in_stock  INTEGER NOT NULL DEFAULT 1, -- 1 = in stock, 0 = out of stock
  badge     TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Cart Items ───────────────────────────────────────────────────────────────
-- Ephemeral: cleared on checkout. Enables cart persistence across devices.
CREATE TABLE IF NOT EXISTS cart_items (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id        INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity       INTEGER NOT NULL DEFAULT 1,
  selected_price REAL    NOT NULL, -- which price tier the user chose (standard/special)
  updated_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, item_id, selected_price) -- one row per (user, item, price-tier)
);

-- ── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id          INTEGER NOT NULL REFERENCES users(id),
  total_amount     REAL    NOT NULL,
  delivery_fee     REAL    NOT NULL DEFAULT 10.00,
  status           TEXT    NOT NULL DEFAULT 'pending',
  -- status flow: pending → confirmed → preparing → ready → delivered | cancelled
  payment_method   TEXT    NOT NULL, -- 'mobile-money' | 'card' | 'cash'
  payment_status   TEXT    NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'
  paystack_ref     TEXT,     -- Paystack payment reference
  delivery_address TEXT    NOT NULL,
  delivery_notes   TEXT,
  phone            TEXT    NOT NULL,
  full_name        TEXT    NOT NULL,
  packaging        TEXT    NOT NULL DEFAULT 'standard',
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Order Items ──────────────────────────────────────────────────────────────
-- Historical record — prices locked at checkout time. Never joined to menu_items for price.
CREATE TABLE IF NOT EXISTS order_items (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id          INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id           INTEGER NOT NULL REFERENCES menu_items(id),
  name_at_purchase  TEXT    NOT NULL, -- snapshot of name in case menu changes
  price_at_purchase REAL    NOT NULL, -- snapshot of exact price paid
  quantity          INTEGER NOT NULL
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_cart_user    ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user  ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items  ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_menu_stock   ON menu_items(in_stock);
