<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useContent } from '../composables/useContent.js'

const props = defineProps({
  contentKey: { type: String, required: true },
  default: { type: String, default: '' },
  tag: { type: String, default: 'span' },
  multiline: { type: Boolean, default: false },
})

const { get, save, registerDefault } = useContent()
const { isAuthenticated } = useAuth()

registerDefault(props.contentKey, props.default)
watch(
  () => props.default,
  (v) => registerDefault(props.contentKey, v),
)

const isEditing = ref(false)
const draft = ref('')
const saving = ref(false)
const error = ref(null)
const elRef = ref(null)

const value = computed(() => get(props.contentKey, props.default))

function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c],
  )
}

// Render *italic* as <em>, **bold** as <strong>, newlines as <br> when multiline.
const renderedHtml = computed(() => {
  let s = escapeHtml(value.value)
  s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  if (props.multiline) s = s.replace(/\n/g, '<br>')
  return s
})

function startEdit() {
  if (!isAuthenticated.value || isEditing.value) return
  draft.value = value.value
  isEditing.value = true
  error.value = null
  nextTick(() => {
    if (elRef.value) {
      // Override v-html content with plain text so contenteditable
      // works on a clean text-node tree, avoiding Vue DOM conflicts.
      elRef.value.textContent = draft.value
      elRef.value.focus()
      const range = document.createRange()
      range.selectNodeContents(elRef.value)
      range.collapse(false)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
  })
}

async function commit() {
  if (!isEditing.value) return
  const next = (elRef.value?.innerText ?? draft.value).replace(/ /g, ' ').trimEnd()
  if (next === value.value) {
    isEditing.value = false
    return
  }
  saving.value = true
  error.value = null
  try {
    await save(props.contentKey, next)
    isEditing.value = false
  } catch (e) {
    error.value = e.message
    console.error('[editable] save failed', e)
  } finally {
    saving.value = false
  }
}

function cancel() {
  isEditing.value = false
  error.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    cancel()
  } else if (e.key === 'Enter' && !props.multiline && !e.shiftKey) {
    e.preventDefault()
    commit()
  }
}
</script>

<template>
  <component
    :is="tag"
    ref="elRef"
    data-editable
    :class="['editable', { 'is-editing': isEditing, 'is-saving': saving }]"
    :contenteditable="isEditing"
    spellcheck="false"
    @click="startEdit"
    @blur="isEditing && commit()"
    @keydown="onKeydown"
    v-html="isEditing ? undefined : renderedHtml"
  />
</template>

<style scoped>
.editable.is-saving {
  opacity: 0.6;
}
.editable[contenteditable='true'] {
  outline: none;
  white-space: pre-wrap;
}
.editable :deep(em) {
  font-style: italic;
  color: var(--color-terracotta);
}
.editable :deep(strong) {
  font-weight: 700;
}
</style>
