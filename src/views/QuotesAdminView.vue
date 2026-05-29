<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { api } from '../api/client.js'

const router = useRouter()
const { state: authState, isAuthenticated, bootstrap: bootstrapAuth, logout } = useAuth()

const loading = ref(true)
const error = ref(null)
const quotes = ref([])
const summary = ref({ new: 0, contacted: 0, closed: 0, archived: 0, total: 0 })
const selectedId = ref(null)
const search = ref('')
const filter = ref('all') // all | new | contacted | closed | archived
const editingNotesId = ref(null)
const notesDraft = ref('')

const filteredQuotes = computed(() => {
  return quotes.value.filter((q) => {
    if (filter.value !== 'all' && q.status !== filter.value) return false
    return true
  })
})

const selected = computed(() => quotes.value.find((q) => q.id === selectedId.value) || null)

const statuses = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'closed', label: 'Closed' },
  { key: 'archived', label: 'Archived' },
]

async function load() {
  loading.value = true
  error.value = null
  try {
    const params = new URLSearchParams()
    if (search.value.trim()) params.set('q', search.value.trim())
    const url = `/api/quotes${params.toString() ? `?${params}` : ''}`
    const data = await api(url, { auth: true })
    quotes.value = data.quotes
    summary.value = data.summary
    if (selectedId.value && !data.quotes.find((q) => q.id === selectedId.value)) {
      selectedId.value = data.quotes[0]?.id || null
    } else if (!selectedId.value) {
      selectedId.value = data.quotes[0]?.id || null
    }
  } catch (e) {
    if (e.status === 401) {
      router.push('/login')
      return
    }
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function setStatus(quote, status) {
  try {
    const updated = await api(`/api/quotes/${quote.id}`, {
      method: 'PATCH',
      auth: true,
      body: { status },
    })
    const idx = quotes.value.findIndex((q) => q.id === quote.id)
    if (idx >= 0) quotes.value[idx] = updated
    summary.value[quote.status] = Math.max(0, (summary.value[quote.status] || 1) - 1)
    summary.value[status] = (summary.value[status] || 0) + 1
  } catch (e) {
    error.value = e.message
  }
}

function startNotes(q) {
  editingNotesId.value = q.id
  notesDraft.value = q.notes || ''
}

async function saveNotes(q) {
  try {
    const updated = await api(`/api/quotes/${q.id}`, {
      method: 'PATCH',
      auth: true,
      body: { notes: notesDraft.value },
    })
    const idx = quotes.value.findIndex((x) => x.id === q.id)
    if (idx >= 0) quotes.value[idx] = updated
    editingNotesId.value = null
  } catch (e) {
    error.value = e.message
  }
}

async function remove(q) {
  if (!confirm(`Delete quote from ${q.firstName} ${q.lastName}?`)) return
  try {
    await api(`/api/quotes/${q.id}`, { method: 'DELETE', auth: true })
    quotes.value = quotes.value.filter((x) => x.id !== q.id)
    summary.value[q.status] = Math.max(0, (summary.value[q.status] || 1) - 1)
    summary.value.total = Math.max(0, summary.value.total - 1)
    if (selectedId.value === q.id) selectedId.value = quotes.value[0]?.id || null
  } catch (e) {
    error.value = e.message
  }
}

function formatDate(s) {
  if (!s) return ''
  // SQLite returns "YYYY-MM-DD HH:MM:SS" (UTC). Treat as UTC.
  const d = new Date(s.replace(' ', 'T') + 'Z')
  return d.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function relative(s) {
  if (!s) return ''
  const d = new Date(s.replace(' ', 'T') + 'Z')
  const diff = Math.round((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`
  return `${Math.floor(diff / 86400)} d ago`
}

onMounted(async () => {
  await bootstrapAuth()
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  await load()
})

let searchTimer
watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(load, 250)
})

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="quotes-admin">
    <header class="admin-header">
      <div class="admin-header-inner">
        <div class="brand">
          <img src="/img/logoRa.jpeg" alt="" />
          <div>
            <div class="brand-name">Ra Unlimited</div>
            <div class="brand-sub">Quote inbox</div>
          </div>
        </div>
        <div class="header-actions">
          <span class="user-email">{{ authState.user?.email }}</span>
          <router-link to="/" class="header-link">Back to site</router-link>
          <button class="header-logout" @click="handleLogout">Sign out</button>
        </div>
      </div>
    </header>

    <main class="layout">
      <!-- LEFT: list + filters -->
      <section class="list-pane">
        <div class="list-head">
          <div class="counters">
            <button
              v-for="s in statuses"
              :key="s.key"
              :class="['counter', { active: filter === s.key }]"
              @click="filter = s.key"
            >
              <span class="counter-label">{{ s.label }}</span>
              <span class="counter-num">
                {{ s.key === 'all' ? summary.total : summary[s.key] || 0 }}
              </span>
            </button>
          </div>
          <div class="search">
            <input v-model="search" type="search" placeholder="Search name, email, address…" />
          </div>
        </div>

        <div v-if="loading" class="state">Loading…</div>
        <div v-else-if="error" class="state error">{{ error }}</div>
        <div v-else-if="!filteredQuotes.length" class="state">
          {{ filter === 'all' ? 'No quotes yet.' : `No quotes with status "${filter}".` }}
        </div>

        <ul v-else class="list">
          <li
            v-for="q in filteredQuotes"
            :key="q.id"
            :class="['list-item', { selected: q.id === selectedId, [`is-${q.status}`]: true }]"
            @click="selectedId = q.id"
          >
            <div class="list-row">
              <div class="list-name">{{ q.firstName }} {{ q.lastName }}</div>
              <div class="list-time">{{ relative(q.createdAt) }}</div>
            </div>
            <div class="list-sub">{{ q.email }} · {{ q.propertyType }}</div>
            <div class="list-row footer">
              <span :class="['pill', `pill-${q.status}`]">{{ q.status }}</span>
              <span class="bill">₱{{ q.monthlyBill.toLocaleString() }}/mo</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- RIGHT: detail -->
      <section class="detail-pane">
        <div v-if="!selected" class="detail-empty">
          <div class="detail-empty-icon">✉</div>
          <p>Select a quote to view details.</p>
        </div>

        <article v-else class="detail">
          <header class="detail-head">
            <div>
              <h2 class="detail-name">{{ selected.firstName }} {{ selected.lastName }}</h2>
              <div class="detail-meta">
                Submitted {{ formatDate(selected.createdAt) }} · #{{ selected.id }}
              </div>
            </div>
            <div class="status-switch">
              <button
                v-for="s in statuses.filter((s) => s.key !== 'all')"
                :key="s.key"
                :class="['status-btn', { active: selected.status === s.key }]"
                @click="setStatus(selected, s.key)"
              >
                {{ s.label }}
              </button>
            </div>
          </header>

          <div class="detail-grid">
            <div class="field">
              <div class="field-label">Email</div>
              <a :href="`mailto:${selected.email}`" class="field-link">{{ selected.email }}</a>
            </div>
            <div class="field">
              <div class="field-label">Phone</div>
              <a :href="`tel:${selected.phone}`" class="field-link">{{ selected.phone }}</a>
            </div>
            <div class="field span-2">
              <div class="field-label">Address</div>
              <div class="field-value">{{ selected.address }}</div>
            </div>
            <div class="field">
              <div class="field-label">Property type</div>
              <div class="field-value">{{ selected.propertyType }}</div>
            </div>
            <div class="field">
              <div class="field-label">Monthly bill</div>
              <div class="field-value">₱{{ selected.monthlyBill.toLocaleString() }}</div>
            </div>
            <div v-if="selected.systemSize" class="field span-2">
              <div class="field-label">Estimated system size</div>
              <div class="field-value">{{ selected.systemSize }}</div>
            </div>
            <div v-if="selected.notes && editingNotesId !== selected.id" class="field span-2">
              <div class="field-label">Customer notes</div>
              <div class="field-value note">{{ selected.notes }}</div>
            </div>
          </div>

          <div class="internal-notes">
            <div class="field-label">Internal notes</div>
            <textarea
              v-if="editingNotesId === selected.id"
              v-model="notesDraft"
              rows="4"
              placeholder="Internal notes (not visible to customer)…"
            />
            <div v-else class="notes-display" @click="startNotes(selected)">
              {{ selected.notes || 'Click to add internal notes…' }}
            </div>
            <div v-if="editingNotesId === selected.id" class="notes-actions">
              <button class="btn-primary" @click="saveNotes(selected)">Save</button>
              <button class="btn-ghost" @click="editingNotesId = null">Cancel</button>
            </div>
          </div>

          <footer class="detail-footer">
            <a :href="`mailto:${selected.email}?subject=Your Ra Unlimited quote`" class="btn-primary">
              Reply by email
            </a>
            <a :href="`tel:${selected.phone}`" class="btn-ghost">Call customer</a>
            <button class="btn-danger" @click="remove(selected)">Delete</button>
          </footer>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.quotes-admin {
  min-height: 100vh;
  background: var(--color-cream);
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  color: var(--color-ink);
}

.admin-header {
  background: #fff;
  border-bottom: 1px solid rgba(58, 79, 58, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}
.admin-header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand img { width: 40px; height: 40px; border-radius: 10px; }
.brand-name { font-family: var(--font-serif); font-size: 17px; color: var(--color-moss); letter-spacing: -0.01em; }
.brand-sub { font-size: 11px; color: var(--color-ink-soft); letter-spacing: 0.14em; text-transform: uppercase; }
.header-actions { display: flex; align-items: center; gap: 16px; }
.user-email { font-size: 13px; color: var(--color-ink-soft); }
.header-link { color: var(--color-moss); text-decoration: none; font-size: 13px; font-weight: 500; }
.header-link:hover { color: var(--color-terracotta); }
.header-logout {
  background: var(--color-moss);
  color: var(--color-cream);
  border: none;
  padding: 8px 16px;
  border-radius: 999px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.header-logout:hover { background: var(--color-moss-deep); }

.layout {
  flex: 1;
  display: grid;
  grid-template-columns: 380px 1fr;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 32px;
  gap: 24px;
}

/* LIST */
.list-pane {
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 145px);
}
.list-head {
  padding: 16px;
  border-bottom: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.counters { display: flex; gap: 6px; flex-wrap: wrap; }
.counter {
  background: var(--color-cream-soft);
  border: 1px solid transparent;
  padding: 6px 12px;
  border-radius: 999px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-soft);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.counter:hover { background: var(--color-cream-deep); }
.counter.active {
  background: var(--color-moss);
  color: var(--color-cream);
}
.counter-num {
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11px;
}
.counter.active .counter-num { background: rgba(245, 240, 230, 0.2); }
.search input {
  width: 100%;
  font: inherit;
  font-size: 14px;
  padding: 10px 14px;
  border: 1.5px solid rgba(58, 79, 58, 0.12);
  border-radius: 10px;
  background: var(--color-cream-soft);
}
.search input:focus { outline: none; border-color: var(--color-moss); background: #fff; }

.state { padding: 40px 24px; text-align: center; color: var(--color-ink-soft); font-size: 14px; }
.state.error { color: var(--color-terracotta); }

.list { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex: 1; }
.list-item {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(58, 79, 58, 0.06);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  transition: background 0.12s;
}
.list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 16px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: transparent;
}
.list-item.is-new::before { background: var(--color-terracotta); }
.list-item.is-contacted::before { background: var(--color-sun); }
.list-item.is-closed::before { background: var(--color-moss); opacity: 0.4; }
.list-item:hover { background: var(--color-cream-soft); }
.list-item.selected { background: var(--color-cream-deep); }
.list-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.list-row.footer { align-items: center; margin-top: 2px; }
.list-name { font-weight: 600; font-size: 14px; color: var(--color-ink); }
.list-time { font-size: 11px; color: var(--color-ink-soft); flex-shrink: 0; }
.list-sub { font-size: 12px; color: var(--color-ink-soft); }
.bill { font-size: 12px; color: var(--color-ink-soft); font-variant-numeric: tabular-nums; }
.pill {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
}
.pill-new { background: rgba(199, 82, 42, 0.15); color: var(--color-terracotta); }
.pill-contacted { background: rgba(244, 184, 96, 0.25); color: #8a5a1a; }
.pill-closed { background: rgba(58, 79, 58, 0.12); color: var(--color-moss); }
.pill-archived { background: rgba(42, 42, 36, 0.08); color: var(--color-ink-soft); }

/* DETAIL */
.detail-pane {
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  overflow-y: auto;
  height: calc(100vh - 145px);
}
.detail-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: var(--color-ink-soft);
}
.detail-empty-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-cream-soft);
  display: grid;
  place-items: center;
  font-size: 28px;
  color: var(--color-moss);
}

.detail { padding: 32px 40px; display: flex; flex-direction: column; gap: 32px; }
.detail-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}
.detail-name {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-moss);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}
.detail-meta { font-size: 13px; color: var(--color-ink-soft); }
.status-switch {
  display: flex;
  gap: 4px;
  background: var(--color-cream-soft);
  border-radius: 999px;
  padding: 4px;
}
.status-btn {
  background: transparent;
  border: none;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-soft);
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.status-btn:hover { color: var(--color-moss); }
.status-btn.active { background: var(--color-moss); color: var(--color-cream); }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
  padding: 24px;
  background: var(--color-cream-soft);
  border-radius: 16px;
}
.field { display: flex; flex-direction: column; gap: 4px; }
.field.span-2 { grid-column: span 2; }
.field-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-ink-soft);
}
.field-value { font-size: 15px; color: var(--color-ink); line-height: 1.5; }
.field-value.note { white-space: pre-wrap; }
.field-link {
  font-size: 15px;
  color: var(--color-moss);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.field-link:hover { border-bottom-color: var(--color-terracotta); color: var(--color-terracotta); }

.internal-notes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.notes-display {
  padding: 16px;
  background: var(--color-cream-soft);
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-ink-soft);
  min-height: 80px;
  cursor: text;
  white-space: pre-wrap;
  line-height: 1.5;
  border: 1.5px dashed rgba(58, 79, 58, 0.15);
}
.notes-display:hover { border-color: rgba(58, 79, 58, 0.35); color: var(--color-ink); }
.internal-notes textarea {
  font: inherit;
  font-size: 14px;
  padding: 14px;
  border: 1.5px solid var(--color-moss);
  border-radius: 12px;
  background: #fff;
  resize: vertical;
}
.notes-actions { display: flex; gap: 8px; }

.detail-footer {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 16px;
  border-top: 1px solid rgba(58, 79, 58, 0.08);
}
.btn-primary, .btn-ghost, .btn-danger {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s, transform 0.05s;
}
.btn-primary { background: var(--color-moss); color: var(--color-cream); }
.btn-primary:hover { background: var(--color-moss-deep); }
.btn-ghost {
  background: transparent;
  border: 1.5px solid var(--color-moss);
  color: var(--color-moss);
}
.btn-ghost:hover { background: rgba(58, 79, 58, 0.06); }
.btn-danger {
  background: transparent;
  color: var(--color-terracotta);
  margin-left: auto;
}
.btn-danger:hover { background: rgba(199, 82, 42, 0.08); }

@media (max-width: 960px) {
  .layout { grid-template-columns: 1fr; height: auto; padding: 16px; }
  .list-pane, .detail-pane { height: auto; max-height: 70vh; }
  .admin-header-inner { padding: 12px 16px; flex-wrap: wrap; }
  .header-actions { flex-wrap: wrap; }
  .detail { padding: 24px; }
  .detail-grid { grid-template-columns: 1fr; }
  .field.span-2 { grid-column: span 1; }
}
</style>
