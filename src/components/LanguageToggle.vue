<script setup>
import { useI18n } from '../composables/useI18n.js'

const { lang, setLang } = useI18n()
</script>

<template>
  <div class="lang-toggle" role="group" aria-label="Language">
    <button
      :class="['opt', { active: lang === 'en' }]"
      @click="setLang('en')"
      aria-label="English"
    >
      EN
    </button>
    <span class="sep">·</span>
    <button
      :class="['opt', { active: lang === 'tl' }]"
      @click="setLang('tl')"
      aria-label="Filipino"
    >
      TL
    </button>
    <span class="sep">·</span>
    <button
      :class="['opt', { active: lang === 'ceb' }]"
      @click="setLang('ceb')"
      aria-label="Bisaya"
    >
      BIS
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  user-select: none;
}
.opt {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  padding: 4px 6px;
  cursor: pointer;
  transition: color 0.15s;
}
.opt:hover { color: #fff; }
.opt.active { color: var(--color-orange); }
.sep { color: rgba(255, 255, 255, 0.3); }

/* Light context (when navbar is on light background) */
:global(.navbar-light) .opt { color: rgba(26, 29, 36, 0.55); }
:global(.navbar-light) .opt:hover { color: var(--color-blue-deep); }
:global(.navbar-light) .opt.active { color: var(--color-orange); }
:global(.navbar-light) .sep { color: rgba(26, 29, 36, 0.3); }
</style>
