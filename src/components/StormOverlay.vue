<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  // 0..1 — drives rain density, wind, opacity
  intensity: { type: Number, default: 0 },
})

const canvas = ref(null)
let ctx
let raf
let drops = []
let width = 0
let height = 0
let dpr = 1
let lastTime = 0

function resize() {
  if (!canvas.value) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.value.getBoundingClientRect()
  width = rect.width
  height = rect.height
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initDrops()
}

function initDrops() {
  const target = Math.floor(width * 0.4 * props.intensity)
  drops = []
  for (let i = 0; i < target; i++) drops.push(makeDrop())
}

function makeDrop() {
  const speed = 8 + Math.random() * 12 + props.intensity * 8
  return {
    x: Math.random() * (width + 200) - 100,
    y: Math.random() * height,
    len: 12 + Math.random() * 16,
    speed,
    wind: 3 + props.intensity * 5,
    alpha: 0.25 + Math.random() * 0.35,
  }
}

function draw(t) {
  if (!ctx) return
  const dt = Math.min(50, t - (lastTime || t))
  lastTime = t
  ctx.clearRect(0, 0, width, height)

  // Wind streaks (faint horizontal lines)
  if (props.intensity > 0.3) {
    ctx.strokeStyle = `rgba(220, 220, 240, ${0.04 * props.intensity})`
    ctx.lineWidth = 1
    for (let i = 0; i < 20; i++) {
      const y = (Date.now() / 40 + i * 30) % height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y + 6)
      ctx.stroke()
    }
  }

  // Rain
  ctx.strokeStyle = `rgba(200, 215, 240, ${0.55 * Math.min(1, props.intensity * 1.4)})`
  ctx.lineWidth = 1.2
  ctx.lineCap = 'round'
  for (const d of drops) {
    ctx.globalAlpha = d.alpha * props.intensity
    ctx.beginPath()
    ctx.moveTo(d.x, d.y)
    ctx.lineTo(d.x + d.wind * 0.4, d.y + d.len)
    ctx.stroke()
    d.x += d.wind * (dt / 16)
    d.y += d.speed * (dt / 16)
    if (d.y > height || d.x > width + 50) {
      d.x = Math.random() * width - 50
      d.y = -20
    }
  }
  ctx.globalAlpha = 1

  raf = requestAnimationFrame(draw)
}

watch(
  () => props.intensity,
  () => initDrops(),
)

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(draw)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvas" class="storm-canvas" :style="{ opacity: intensity }" aria-hidden="true" />
</template>

<style scoped>
.storm-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.6s ease;
}
</style>
