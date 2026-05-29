import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import bcrypt from 'bcryptjs'

const dbPath = path.resolve(process.env.DB_PATH || './db/ra.sqlite')
fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    property_type TEXT NOT NULL,
    monthly_bill REAL NOT NULL,
    system_size TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    user_agent TEXT,
    ip TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
  CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
`)

export function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) return
  const hash = bcrypt.hashSync(password, 10)
  db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash)
  console.log(`[seed] admin user created: ${email}`)
}

export default db
