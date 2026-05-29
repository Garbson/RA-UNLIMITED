<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useRouter } from 'vue-router'

const { state, isAuthenticated, logout } = useAuth()
const router = useRouter()
const minimized = ref(false)

function handleLogout() {
  logout()
  router.push('/')
}
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
  padding: 10px 16px 10px 12px;
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
.admin-bar.minimized {
  padding: 8px 14px 8px 8px;
}
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
  gap: 16px;
}
.bar-text { line-height: 1.2; }
.bar-title { font-weight: 600; font-size: 13px; }
.bar-sub { opacity: 0.6; font-size: 11px; }
.bar-link {
  background: rgba(245, 240, 230, 0.1);
  border: none;
  color: #f5f0e6;
  font: inherit;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s;
}
.bar-link:hover { background: rgba(245, 240, 230, 0.2); }
.bar-hint { font-weight: 500; letter-spacing: 0.04em; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
