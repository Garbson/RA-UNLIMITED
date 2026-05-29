import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import db, { ensureAdmin } from './db.js'
import { signToken, requireAuth } from './auth.js'

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

const PORT = Number(process.env.PORT || 3001)
app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`))
