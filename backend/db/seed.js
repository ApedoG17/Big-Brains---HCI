/**
 * seed.js — Seeds the database with the PepperDem menu items.
 * Safe to run multiple times (INSERT OR IGNORE).
 * Run with: npm run seed
 */

import db from './database.js'

const menuItems = [
  {
    name: 'Jollof',
    category: 'jollof',
    price: 50.00,
    price_standard: 50.00,
    price_special: 75.00,
    description: 'A full Jollof platter with spaghetti, mixed salad, egg, sausage and plantain, served with both fish and meat.',
    image_url: '/assets/jollof-combo.jpeg',
    in_stock: 1,
    badge: 'SPECIAL',
  },
  {
    name: 'Waakye',
    category: 'waakye',
    price: 50.00,
    price_standard: 50.00,
    price_special: 75.00,
    description: 'Premium waakye loaded with spaghetti, salad, gari, egg, wele, sausage and ripe plantain, plus your protein.',
    image_url: '/assets/waakye-combo.jpeg',
    in_stock: 1,
    badge: 'SPECIAL',
  },
  {
    name: 'Plain Rice',
    category: 'plain-rice',
    price: 50.00,
    price_standard: 50.00,
    price_special: 75.00,
    description: 'Loaded plain rice with spaghetti, egg, sausage and plantain, paired with both fish and chicken.',
    image_url: '/assets/plain-rice-combo.jpeg',
    in_stock: 1,
    badge: 'SPECIAL',
  },
]

const insertItem = db.prepare(`
  INSERT OR IGNORE INTO menu_items (name, category, price, price_standard, price_special, description, image_url, in_stock, badge)
  VALUES (@name, @category, @price, @price_standard, @price_special, @description, @image_url, @in_stock, @badge)
`)

const seedAll = db.transaction(() => {
  for (const item of menuItems) {
    const info = insertItem.run(item)
    if (info.changes > 0) {
      console.log(`  ✅ Inserted: ${item.name}`)
    } else {
      console.log(`  ⏭️  Skipped (already exists): ${item.name}`)
    }
  }
})

console.log('🌱 Seeding menu items...')
seedAll()
console.log('🎉 Seed complete!')

// Also seed a demo staff account for KDS access
import bcrypt from 'bcryptjs'

const staffEmail = 'kitchen@pepperdem.net'
const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(staffEmail)

if (!existing) {
  const hash = bcrypt.hashSync('kitchen123', 10)
  db.prepare(`
    INSERT INTO users (name, email, password_hash, role)
    VALUES ('Kitchen Staff', ?, ?, 'staff')
  `).run(staffEmail, hash)
  console.log('👨‍🍳 Staff account created: kitchen@pepperdem.net / kitchen123')
} else {
  console.log('👨‍🍳 Staff account already exists.')
}
