<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { CountUp } from 'countup.js'

const props = defineProps({
  end: { type: Number, required: true },
  duration: { type: Number, default: 2.4 },
  decimals: { type: Number, default: 0 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  separator: { type: String, default: ',' },
  trigger: { type: Boolean, default: true },
  pause: { type: Boolean, default: false },
})

const el = ref(null)
let cu

function start() {
  if (!el.value) return
  if (!cu) {
    cu = new CountUp(el.value, props.end, {
      duration: props.duration,
      decimalPlaces: props.decimals,
      separator: props.separator,
      prefix: props.prefix,
      suffix: props.suffix,
      useEasing: true,
    })
  }
  if (!cu.error) cu.start()
}

function reset() {
  if (cu && !cu.error) cu.reset()
}

onMounted(() => {
  if (props.trigger && !props.pause) start()
})
onUnmounted(() => {
  cu = null
})

watch(
  () => props.trigger,
  (v) => {
    if (v && !props.pause) start()
    else reset()
  },
)
watch(
  () => props.pause,
  (v) => {
    if (v && cu && !cu.error) {
      // Freeze by stopping; CountUp doesn't have native pause, but reset+start is ok at boundaries.
    }
  },
)
</script>

<template>
  <span ref="el" class="counter">{{ prefix }}0{{ suffix }}</span>
</template>

<style scoped>
.counter {
  font-variant-numeric: tabular-nums;
}
</style>
