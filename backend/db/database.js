/**
 * database.js — SQLite connection singleton
 * Uses better-sqlite3 (synchronous driver — perfect for Express route handlers).
 * The database file is created automatically on first run.
 */

import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || join(__dirname, 'pepperdem.db')

// Open (or create) the database file
const db = new DatabaseSync(DB_PATH)

// Apply performance pragmas
db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA foreign_keys = ON')

// Helper for transactions
db.transaction = function (fn) {
  return function (...args) {
    db.exec('BEGIN TRANSACTION')
    try {
      const result = fn(...args)
      db.exec('COMMIT')
      return result
    } catch (err) {
      db.exec('ROLLBACK')
      throw err
    }
  }
}

// Run schema on every startup — CREATE TABLE IF NOT EXISTS is idempotent
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
db.exec(schema)

console.log(`✅ SQLite connected — ${DB_PATH}`)

export default db
