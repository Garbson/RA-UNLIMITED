import { reactive, computed, readonly } from 'vue'
import { dict } from '../data/story.js'

const STORAGE_KEY = 'ra_lang'

const state = reactive({
  lang: 'en',
  ready: false,
})

function bootstrap() {
  if (state.ready) return
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'tl') {
      state.lang = saved
    } else {
      // Detect from browser
      const nav = (navigator.language || 'en').toLowerCase()
      if (nav.startsWith('tl') || nav.startsWith('fil')) state.lang = 'tl'
    }
    document.documentElement.lang = state.lang === 'tl' ? 'tl' : 'en'
  }
  state.ready = true
}

function setLang(lang) {
  if (lang !== 'en' && lang !== 'tl') return
  state.lang = lang
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'tl' ? 'tl' : 'en'
  }
}

function toggle() {
  setLang(state.lang === 'en' ? 'tl' : 'en')
}

function t(key, fallback = '') {
  const entry = dict[key]
  if (!entry) return fallback || key
  return entry[state.lang] || entry.en || fallback || key
}

export function useI18n() {
  return {
    state: readonly(state),
    lang: computed(() => state.lang),
    bootstrap,
    setLang,
    toggle,
    t,
  }
}
