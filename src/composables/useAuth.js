import { reactive, computed, readonly } from 'vue'
import { api, getToken, setToken } from '../api/client.js'

const state = reactive({
  user: null,
  ready: false,
  loading: false,
})

async function bootstrap() {
  if (state.ready) return
  const token = getToken()
  if (!token) {
    state.ready = true
    return
  }
  try {
    const data = await api('/api/auth/me', { auth: true })
    state.user = data.user
  } catch {
    setToken(null)
    state.user = null
  } finally {
    state.ready = true
  }
}

async function login(email, password) {
  state.loading = true
  try {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    setToken(data.token)
    state.user = data.user
    return data.user
  } finally {
    state.loading = false
  }
}

function logout() {
  setToken(null)
  state.user = null
}

export function useAuth() {
  return {
    state: readonly(state),
    isAuthenticated: computed(() => !!state.user),
    bootstrap,
    login,
    logout,
  }
}
