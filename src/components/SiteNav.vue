<script setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import LanguageToggle from './LanguageToggle.vue'
import { useI18n } from '../composables/useI18n.js'

const props = defineProps({
  scheme: { type: String, default: 'dark' }, // dark | light
})

const emit = defineEmits(['cta'])

const { t } = useI18n()

const navClass = computed(() => ['site-nav', `scheme-${props.scheme}`])
</script>

<template>
  <header :class="navClass" :data-scheme="scheme">
    <div class="nav-inner">
      <div class="brand">
        <Logo :size="36" />
        <div class="brand-text">
          <div class="brand-name">{{ t('brand.name') }}</div>
          <div class="brand-tag">{{ t('brand.tagline') }}</div>
        </div>
      </div>

      <div class="nav-right">
        <LanguageToggle :class="scheme === 'light' ? 'navbar-light' : ''" />
        <button class="cta-btn" @click="emit('cta')">
          <span>{{ t('nav.partner') }}</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;
}
.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-text { line-height: 1.15; }
.brand-name {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.01em;
}
.brand-tag {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.6;
  letter-spacing: 0.01em;
}
.nav-right { display: flex; align-items: center; gap: 20px; }
.cta-btn {
  background: var(--color-orange);
  color: #fff;
  border: none;
  font: inherit;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s, transform 0.1s;
}
.cta-btn:hover { background: #ea580c; transform: translateY(-1px); }

/* Scheme variants */
.scheme-dark { color: #fff; background: linear-gradient(to bottom, rgba(10, 18, 40, 0.5), transparent); }
.scheme-light { color: var(--color-blue); background: rgba(250, 246, 238, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(30, 58, 95, 0.08); }
.scheme-light .brand-tag { opacity: 0.5; }

@media (max-width: 720px) {
  .nav-inner { padding: 14px 20px; }
  .brand-tag { display: none; }
  .cta-btn span:last-child { display: none; }
}
</style>
