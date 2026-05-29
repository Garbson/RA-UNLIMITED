import { reactive, readonly } from 'vue'
import { api } from '../api/client.js'

const state = reactive({
  values: {}, // key -> string (server overrides)
  defaults: {}, // key -> string (registered fallbacks)
  ready: false,
  loading: false,
  pending: {}, // key -> pending value (for optimistic updates)
})

async function bootstrap() {
  if (state.ready) return
  state.loading = true
  try {
    const data = await api('/api/content')
    state.values = data || {}
  } catch (err) {
    console.warn('[content] failed to load', err)
    state.values = {}
  } finally {
    state.loading = false
    state.ready = true
  }
}

function registerDefault(key, value) {
  if (state.defaults[key] === undefined) state.defaults[key] = value
}

function get(key, fallback = '') {
  if (state.values[key] !== undefined) return state.values[key]
  if (state.defaults[key] !== undefined) return state.defaults[key]
  return fallback
}

async function save(key, value) {
  state.pending[key] = value
  try {
    await api(`/api/content/${encodeURIComponent(key)}`, {
      method: 'PUT',
      auth: true,
      body: { value },
    })
    state.values[key] = value
  } finally {
    delete state.pending[key]
  }
}

export function useContent() {
  return {
    state: readonly(state),
    bootstrap,
    registerDefault,
    get,
    save,
  }
}
