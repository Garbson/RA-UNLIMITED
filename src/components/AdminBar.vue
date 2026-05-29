<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useRouter, useRoute } from 'vue-router'
import { api } from '../api/client.js'

const { state, isAuthenticated, logout } = useAuth()
const router = useRouter()
const route = useRoute()
const minimized = ref(false)
const newCount = ref(0)
let pollTimer

async function refreshCount() {
  if (!isAuthenticated.value) {
    newCount.value = 0
    return
  }
  try {
    const data = await api('/api/quotes?status=new', { auth: true })
    newCount.value = data.summary?.new ?? 0
  } catch {
    // silent — admin bar shouldn't break the page
  }
}

function handleLogout() {
  logout()
  router.push('/')
}

onMounted(() => {
  refreshCount()
  pollTimer = setInterval(refreshCount, 30000)
})
onUnmounted(() => clearInterval(pollTimer))

// Refresh when leaving /quotes (status may have changed)
watch(
  () => route.path,
  () => refreshCount(),
)
watch(isAuthenticated, () => refreshCount())
</script>

<template>
  <Transition name="fade">
    <div v-if="isAuthenticated" class="admin-bar" :class="{ minimized }">
      <button class="bar-toggle" @click="minimized = !minimized" :title="minimized ? 'Expand' : 'Minimize'">
        <span class="dot" />
      </button>
      <div v-if="!minimized" class="bar-body">
        <div class="bar-text">
          <div class="bar-title">Editor mode</div>
          <div class="bar-sub">{{ state.user?.email }}</div>
        </div>
        <router-link to="/quotes" class="bar-link bar-link-quotes">
          <span>Quotes</span>
          <span v-if="newCount > 0" class="badge">{{ newCount }}</span>
        </router-link>
        <button class="bar-link" @click="handleLogout">Sign out</button>
      </div>
      <div v-else class="bar-hint">Editing</div>
    </div>
  </Transition>
</template>

<style scoped>
.admin-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #2a2a24;
  color: #f5f0e6;
  padding: 8px 8px 8px 12px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  font-family: var(--font-sans);
  font-size: 13px;
  user-select: none;
}
.admin-bar.minimized { padding: 8px 14px 8px 8px; }
.bar-toggle {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f4b860;
  box-shadow: 0 0 0 4px rgba(244, 184, 96, 0.18);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(244, 184, 96, 0.18); }
  50% { box-shadow: 0 0 0 7px rgba(244, 184, 96, 0.08); }
}
.bar-body {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bar-text { line-height: 1.2; padding-right: 8px; }
.bar-title { font-weight: 600; font-size: 13px; }
.bar-sub { opacity: 0.6; font-size: 11px; }
.bar-link {
  background: rgba(245, 240, 230, 0.1);
  border: none;
  color: #f5f0e6;
  font: inherit;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.bar-link:hover { background: rgba(245, 240, 230, 0.2); }
.bar-link-quotes { background: rgba(244, 184, 96, 0.15); color: #f4b860; }
.bar-link-quotes:hover { background: rgba(244, 184, 96, 0.28); }
.badge {
  background: var(--color-terracotta, #c7522a);
  color: #fff;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 7px;
  min-width: 18px;
  text-align: center;
}
.bar-hint { font-weight: 500; letter-spacing: 0.04em; padding: 0 8px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
