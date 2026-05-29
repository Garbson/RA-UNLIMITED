<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const { login } = useAuth()
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = null
  try {
    await login(email.value.trim(), password.value)
    router.push('/')
  } catch (e) {
    error.value = e.status === 401 ? 'Wrong email or password.' : 'Sign-in failed. Try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="brand">
        <img src="/img/logoRa.jpeg" alt="Ra Unlimited" />
        <div>
          <div class="brand-name">Ra Unlimited</div>
          <div class="brand-sub">Content studio</div>
        </div>
      </div>

      <h1 class="title">Sign in to edit</h1>
      <p class="subtitle">
        Once signed in, click any text on the site to update it.
      </p>

      <form @submit.prevent="submit" class="form">
        <label>
          <span>Email</span>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@raunlimited.com"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
          />
        </label>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" :disabled="loading" class="submit">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <router-link to="/" class="back">← Back to site</router-link>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at top right, rgba(244, 184, 96, 0.18), transparent 50%),
    radial-gradient(ellipse at bottom left, rgba(58, 79, 58, 0.12), transparent 50%),
    var(--color-cream);
  display: grid;
  place-items: center;
  padding: 24px;
  font-family: var(--font-sans);
}
.login-card {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: var(--shadow-lift);
  border: 1px solid rgba(58, 79, 58, 0.08);
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}
.brand img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
}
.brand-name {
  font-family: var(--font-serif);
  font-size: 18px;
  letter-spacing: -0.01em;
  color: var(--color-moss);
}
.brand-sub {
  font-size: 12px;
  color: var(--color-ink-soft);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.title {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin: 0 0 8px;
  line-height: 1.1;
}
.subtitle {
  color: var(--color-ink-soft);
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.5;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--color-ink);
  font-weight: 500;
}
.form input {
  font: inherit;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.5px solid rgba(58, 79, 58, 0.18);
  border-radius: 10px;
  background: var(--color-cream-soft);
  color: var(--color-ink);
  transition: border-color 0.15s, background 0.15s;
}
.form input:focus {
  outline: none;
  border-color: var(--color-moss);
  background: #fff;
}
.error {
  background: rgba(199, 82, 42, 0.08);
  color: var(--color-terracotta);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}
.submit {
  margin-top: 8px;
  background: var(--color-moss);
  color: var(--color-cream);
  font: inherit;
  font-weight: 600;
  padding: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, transform 0.05s;
}
.submit:hover:not(:disabled) { background: var(--color-moss-deep); }
.submit:active:not(:disabled) { transform: scale(0.99); }
.submit:disabled { opacity: 0.6; cursor: not-allowed; }
.back {
  display: block;
  text-align: center;
  margin-top: 24px;
  color: var(--color-ink-soft);
  text-decoration: none;
  font-size: 13px;
}
.back:hover { color: var(--color-moss); }
</style>
