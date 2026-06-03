<script setup>
import { useI18n } from '../composables/useI18n.js'

const props = defineProps({
  activeAct: { type: Number, required: true },
  acts: { type: Number, default: 5 },
})

const emit = defineEmits(['jump'])

const { t } = useI18n()

const labels = [
  'progress.act1',
  'progress.act2',
  'progress.act3',
  'progress.act4',
  'progress.act5',
]
</script>

<template>
  <nav class="progress-dots" aria-label="Story progress">
    <button
      v-for="i in acts"
      :key="i"
      :class="['dot', { active: i === activeAct, passed: i < activeAct }]"
      :aria-label="t(labels[i - 1])"
      :aria-current="i === activeAct ? 'true' : null"
      @click="emit('jump', i)"
    >
      <span class="dot-label">{{ String(i).padStart(2, '0') }} · {{ t(labels[i - 1]) }}</span>
      <span class="dot-mark" />
    </button>
  </nav>
</template>

<style scoped>
.progress-dots {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 30;
}
.dot {
  background: transparent;
  border: none;
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  font: inherit;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s;
}
.dot:hover { color: #fff; }
.dot-mark {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  transition: background 0.25s, transform 0.25s, border-color 0.25s;
  flex-shrink: 0;
}
.dot.passed .dot-mark { background: currentColor; }
.dot.active {
  color: var(--color-orange);
}
.dot.active .dot-mark {
  background: var(--color-orange);
  border-color: var(--color-orange);
  transform: scale(1.15);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.18);
}
.dot-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.25s, transform 0.25s;
  white-space: nowrap;
}
.dot:hover .dot-label,
.dot.active .dot-label {
  opacity: 1;
  transform: translateX(0);
}

/* Light context */
:global(.progress-light) .dot { color: rgba(26, 29, 36, 0.4); }
:global(.progress-light) .dot:hover { color: var(--color-blue-deep); }
:global(.progress-light) .dot.active { color: var(--color-orange); }

@media (max-width: 960px) {
  .progress-dots { display: none; }
}
</style>
