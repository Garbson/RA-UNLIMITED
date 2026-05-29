import bcrypt from 'bcryptjs'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { requireAuth, signToken } from './auth.js'
import db, { ensureAdmin } from './db.js'

ensureAdmin()

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
    credentials: false,
  }),
)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'missing credentials' })
  const user = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(email)
  if (!user) return res.status(401).json({ error: 'invalid credentials' })
  if (!bcrypt.compareSync(password, user.password_hash))
    return res.status(401).json({ error: 'invalid credentials' })
  const token = signToken({ id: user.id, email: user.email })
  res.json({ token, user: { id: user.id, email: user.email } })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } })
})

app.get('/api/content', (_req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all()
  const map = {}
  for (const r of rows) map[r.key] = r.value
  res.json(map)
})

app.put('/api/content/:key', requireAuth, (req, res) => {
  const { key } = req.params
  const { value } = req.body || {}
  if (typeof value !== 'string') return res.status(400).json({ error: 'value must be string' })
  if (!/^[a-zA-Z0-9._-]{1,120}$/.test(key)) return res.status(400).json({ error: 'invalid key' })
  db.prepare(
    `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ).run(key, value)
  res.json({ key, value })
})

app.put('/api/content', requireAuth, (req, res) => {
  const entries = req.body || {}
  if (typeof entries !== 'object' || Array.isArray(entries))
    return res.status(400).json({ error: 'expected object' })
  const tx = db.transaction((obj) => {
    const stmt = db.prepare(
      `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    )
    for (const [k, v] of Object.entries(obj)) {
      if (!/^[a-zA-Z0-9._-]{1,120}$/.test(k) || typeof v !== 'string') continue
      stmt.run(k, v)
    }
  })
  tx(entries)
  res.json({ ok: true })
})

// ---------- QUOTES ----------

const QUOTE_STATUSES = new Set(['new', 'contacted', 'closed', 'archived'])

function quoteRowToJson(r) {
  return {
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    address: r.address,
    propertyType: r.property_type,
    monthlyBill: r.monthly_bill,
    systemSize: r.system_size,
    notes: r.notes,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }
}

app.post('/api/quotes', (req, res) => {
  const b = req.body || {}
  const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'propertyType', 'monthlyBill']
  for (const f of required) {
    if (b[f] === undefined || b[f] === null || b[f] === '')
      return res.status(400).json({ error: `missing field: ${f}` })
  }
  if (!/.+@.+\..+/.test(b.email)) return res.status(400).json({ error: 'invalid email' })
  const bill = Number(b.monthlyBill)
  if (!Number.isFinite(bill) || bill <= 0)
    return res.status(400).json({ error: 'invalid monthlyBill' })

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim()
  const ua = (req.headers['user-agent'] || '').toString().slice(0, 500)

  const info = db
    .prepare(
      `INSERT INTO quotes
       (first_name, last_name, email, phone, address, property_type, monthly_bill, system_size, notes, user_agent, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      String(b.firstName).slice(0, 120),
      String(b.lastName).slice(0, 120),
      String(b.email).slice(0, 200),
      String(b.phone).slice(0, 60),
      String(b.address).slice(0, 500),
      String(b.propertyType).slice(0, 120),
      bill,
      b.systemSize ? String(b.systemSize).slice(0, 120) : null,
      b.notes ? String(b.notes).slice(0, 2000) : null,
      ua,
      ip,
    )

  res.status(201).json({ id: info.lastInsertRowid })
})

app.get('/api/quotes', requireAuth, (req, res) => {
  const status = req.query.status
  const search = req.query.q
  const params = []
  let where = ''
  if (status && QUOTE_STATUSES.has(status)) {
    where += ' WHERE status = ?'
    params.push(status)
  }
  if (search) {
    where += where ? ' AND' : ' WHERE'
    where += ' (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ? OR address LIKE ?)'
    const s = `%${String(search).slice(0, 80)}%`
    params.push(s, s, s, s, s)
  }
  const rows = db
    .prepare(`SELECT * FROM quotes${where} ORDER BY created_at DESC LIMIT 500`)
    .all(...params)
  const counts = db
    .prepare(`SELECT status, COUNT(*) as n FROM quotes GROUP BY status`)
    .all()
  const summary = { new: 0, contacted: 0, closed: 0, archived: 0, total: 0 }
  for (const c of counts) {
    summary[c.status] = c.n
    summary.total += c.n
  }
  res.json({ quotes: rows.map(quoteRowToJson), summary })
})

app.patch('/api/quotes/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  const { status, notes } = req.body || {}
  const updates = []
  const params = []
  if (status !== undefined) {
    if (!QUOTE_STATUSES.has(status)) return res.status(400).json({ error: 'invalid status' })
    updates.push('status = ?')
    params.push(status)
  }
  if (notes !== undefined) {
    if (typeof notes !== 'string') return res.status(400).json({ error: 'notes must be string' })
    updates.push('notes = ?')
    params.push(notes.slice(0, 2000))
  }
  if (!updates.length) return res.status(400).json({ error: 'no changes' })
  updates.push(`updated_at = datetime('now')`)
  params.push(id)
  const info = db.prepare(`UPDATE quotes SET ${updates.join(', ')} WHERE id = ?`).run(...params)
  if (!info.changes) return res.status(404).json({ error: 'not found' })
  const row = db.prepare('SELECT * FROM quotes WHERE id = ?').get(id)
  res.json(quoteRowToJson(row))
})

app.delete('/api/quotes/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  const info = db.prepare('DELETE FROM quotes WHERE id = ?').run(id)
  if (!info.changes) return res.status(404).json({ error: 'not found' })
  res.status(204).end()
})

const PORT = Number(process.env.PORT || 3001)
app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`))
