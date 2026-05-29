<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EditableText from './EditableText.vue'

const router = useRouter()
const drawer = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function navigateHome() {
  router.push('/')
}

async function scrollTo(id, opts = {}) {
  drawer.value = false
  if (router.currentRoute.value.path !== '/') {
    await router.push('/')
    setTimeout(() => doScroll(id), 120)
  } else {
    doScroll(id)
  }
}

function doScroll(id) {
  const el = id.startsWith('.') ? document.querySelector(id) : document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const navLinks = [
  { type: 'route', to: '/', label: 'Home' },
  { type: 'action', label: 'About', action: () => scrollTo('about-section') },
  { type: 'route', to: '/services', label: 'Services' },
  { type: 'route', to: '/solar-solutions', label: 'Solutions' },
  { type: 'route', to: '/quote', label: 'Get a quote' },
  { type: 'action', label: 'Contact', action: () => scrollTo('.footer-section') },
]
</script>

<template>
  <header :class="['site-header', { scrolled }]">
    <div class="header-inner">
      <button class="brand" @click="navigateHome" aria-label="Go to homepage">
        <img src="/img/logoRa.jpeg" alt="" class="brand-logo" />
        <span class="brand-name">
          <EditableText content-key="brand.name" default="Ra Unlimited" />
        </span>
      </button>

      <nav class="nav-desktop">
        <template v-for="(l, i) in navLinks" :key="i">
          <router-link
            v-if="l.type === 'route'"
            :to="l.to"
            class="nav-link"
            :class="{ cta: l.label === 'Get a quote' }"
          >
            {{ l.label }}
          </router-link>
          <button v-else class="nav-link" @click="l.action">{{ l.label }}</button>
        </template>
      </nav>

      <button
        class="menu-toggle"
        @click="drawer = !drawer"
        :aria-expanded="drawer"
        aria-label="Toggle menu"
      >
        <span :class="['bar', { open: drawer }]" />
        <span :class="['bar', { open: drawer }]" />
        <span :class="['bar', { open: drawer }]" />
      </button>
    </div>

    <Transition name="drawer">
      <div v-if="drawer" class="drawer">
        <nav class="drawer-nav">
          <template v-for="(l, i) in navLinks" :key="i">
            <router-link
              v-if="l.type === 'route'"
              :to="l.to"
              class="drawer-link"
              @click="drawer = false"
            >
              {{ l.label }}
            </router-link>
            <button v-else class="drawer-link" @click="l.action">{{ l.label }}</button>
          </template>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(245, 240, 230, 0);
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}
.site-header.scrolled {
  background: rgba(245, 240, 230, 0.85);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  box-shadow: 0 1px 0 rgba(58, 79, 58, 0.08);
}
.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
  color: var(--color-moss);
}
.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
}
.brand-name {
  font-family: var(--font-serif);
  font-size: 20px;
  letter-spacing: -0.01em;
  font-weight: 500;
  color: var(--color-moss);
}
.nav-desktop {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  background: none;
  border: none;
  color: var(--color-ink);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.nav-link:hover {
  color: var(--color-moss);
  background: rgba(58, 79, 58, 0.06);
}
.nav-link.cta {
  background: var(--color-moss);
  color: var(--color-cream);
  padding: 10px 22px;
  margin-left: 8px;
}
.nav-link.cta:hover {
  background: var(--color-moss-deep);
}
.router-link-exact-active:not(.cta) {
  color: var(--color-terracotta);
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  width: 44px;
  height: 44px;
  cursor: pointer;
  position: relative;
  margin-left: auto;
}
.bar {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--color-moss);
  margin: 5px auto;
  transition: transform 0.25s, opacity 0.25s;
}
.bar.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.bar.open:nth-child(2) { opacity: 0; }
.bar.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.drawer {
  position: absolute;
  inset: 100% 0 auto 0;
  background: var(--color-cream);
  box-shadow: 0 12px 32px rgba(42, 42, 36, 0.12);
  border-top: 1px solid rgba(58, 79, 58, 0.08);
}
.drawer-nav { display: flex; flex-direction: column; padding: 12px 24px 28px; }
.drawer-link {
  background: none;
  border: none;
  color: var(--color-ink);
  font: inherit;
  font-size: 18px;
  font-weight: 500;
  padding: 18px 8px;
  text-align: left;
  text-decoration: none;
  border-bottom: 1px solid rgba(58, 79, 58, 0.08);
  cursor: pointer;
  font-family: var(--font-serif);
  letter-spacing: -0.01em;
}
.drawer-link:last-child { border-bottom: none; }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s, transform 0.2s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 960px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: block; }
  .header-inner { padding: 14px 20px; }
  .brand-name { font-size: 18px; }
}
</style>
