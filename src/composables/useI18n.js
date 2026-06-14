import { reactive, computed, readonly } from 'vue'
import { dict } from '../data/story.js'

const STORAGE_KEY = 'ra_lang'

const LANGS = ['en', 'tl', 'ceb']
const LANG_NAMES = { en: 'English', tl: 'Filipino', ceb: 'Bisaya' }

const state = reactive({
  lang: 'en',
  ready: false,
})

function bootstrap() {
  if (state.ready) return
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) {
      state.lang = saved
    } else {
      // Detect from browser
      const nav = (navigator.language || 'en').toLowerCase()
      if (nav.startsWith('ceb') || nav.startsWith('bis')) {
        state.lang = 'ceb'
      } else if (nav.startsWith('tl') || nav.startsWith('fil')) {
        state.lang = 'tl'
      }
    }
    document.documentElement.lang = state.lang
  }
  state.ready = true
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return
  state.lang = lang
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }
}

function toggle() {
  const idx = LANGS.indexOf(state.lang)
  const next = LANGS[(idx + 1) % LANGS.length]
  setLang(next)
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
    langs: LANGS,
    langNames: LANG_NAMES,
    bootstrap,
    setLang,
    toggle,
    t,
  }
}
