<script setup>
// 3D scene container. No shadows, wide framing, the village fills the frame.
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import Diorama from './Diorama.vue'
import Rain from './Rain.vue'
import CameraRig from './CameraRig.vue'
import { palettes } from './palettes.js'

const props = defineProps({
  mood: { type: String, default: 'poverty' },
  buildStep: { type: Number, default: 0 },
  stormIntensity: { type: Number, default: 0 },
  shake: { type: Number, default: 0 },
  cameraKey: { type: Number, default: 1 },
  cameraProgress: { type: Number, default: 0 },
})

// Apply palette instantly — no rAF tween (causes Vue patch storms with TresJS primitives).
// Smooth sky transitions are handled by CSS transition on .scene-3d.
const activePalette = ref({ ...palettes.poverty })

watch(
  () => props.mood,
  (next) => {
    if (palettes[next]) activePalette.value = { ...palettes[next] }
  },
  { immediate: true },
)

// Camera views — terra menor (r=11), câmera bem longe para vila parecer menor/mais épica
const baseViews = {
  1: { position: [0, 14, 28], lookAt: [0, 0.5, 0] },  // bien longe, visão aérea pobreza
  2: { position: [-5, 11, 25], lookAt: [0, 1, 0] },   // diagonal, painéis chegando
  3: { position: [5, 12, 24], lookAt: [0, 1.2, 0] },  // pull back, prosperidade
}

const view = computed(() => {
  const k = Math.max(1, Math.min(Object.keys(baseViews).length, Math.round(props.cameraKey)))
  const v = baseViews[k]
  // Slow lateral drift for cinematic feel
  const a = (props.cameraProgress - 0.5) * 0.35
  const radius = Math.hypot(v.position[0], v.position[2])
  const angle0 = Math.atan2(v.position[2], v.position[0])
  const angle = angle0 + a
  return {
    position: [Math.cos(angle) * radius, v.position[1], Math.sin(angle) * radius],
    lookAt: v.lookAt,
  }
})

// Storm shake — only runs rAF while shaking, throttled to ~10fps
const shakeRef = ref({ x: 0, y: 0 })
let shakeRaf = null
let shakeLastUpdate = 0

function startShakeLoop() {
  if (shakeRaf) return // already running
  shakeLastUpdate = 0
  function tick() {
    if (props.shake > 0) {
      const now = performance.now()
      if (now - shakeLastUpdate > 100) {
        const amp = props.shake * 0.15
        shakeRef.value = {
          x: (Math.random() - 0.5) * amp,
          y: (Math.random() - 0.5) * amp,
        }
        shakeLastUpdate = now
      }
      shakeRaf = requestAnimationFrame(tick)
    } else {
      // Shake ended — reset to zero once and stop the loop
      if (shakeRef.value.x !== 0 || shakeRef.value.y !== 0) {
        shakeRef.value = { x: 0, y: 0 }
      }
      shakeRaf = null
    }
  }
  shakeRaf = requestAnimationFrame(tick)
}

watch(() => props.shake, (v) => {
  if (v > 0) startShakeLoop()
})

onUnmounted(() => {
  if (shakeRaf) cancelAnimationFrame(shakeRaf)
})

const finalView = computed(() => ({
  position: [
    view.value.position[0] + shakeRef.value.x,
    view.value.position[1] + shakeRef.value.y,
    view.value.position[2],
  ],
  lookAt: view.value.lookAt,
}))

const gl = {
  alpha: true, // let the CSS gradient behind the canvas show through
  antialias: true,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.05,
  outputColorSpace: SRGBColorSpace,
  powerPreference: 'high-performance',
}

const skyColor = computed(() => activePalette.value.sky)
const fogColor = computed(() => activePalette.value.fog)
const bgStyle = computed(() => ({
  background: `linear-gradient(180deg, ${activePalette.value.sky} 0%, ${activePalette.value.fog} 100%)`,
}))
</script>

<template>
  <div class="scene-3d" :style="bgStyle">
    <TresCanvas v-bind="gl" :clear-color="skyColor" :shadows="false">
      <TresPerspectiveCamera
        :args="[38, 1.6, 0.1, 200]"
        :position="[0, 11, 22]"
        :look-at="[0, 0.5, 0]"
      />
      <CameraRig :view="finalView" :lerp="0.05" />

      <!-- Soft far fog only -->
      <TresFog :args="['#d4ecff', 45, 110]" :color="fogColor" attach="fog" />

      <TresAmbientLight :color="activePalette.ambient" :intensity="activePalette.ambientIntensity" />
      <TresDirectionalLight
        :position="[-10, 14, 8]"
        :color="activePalette.sun"
        :intensity="activePalette.sunIntensity"
      />
      <TresHemisphereLight
        :sky-color="activePalette.sky"
        :ground-color="activePalette.ground"
        :intensity="0.55"
      />

      <!-- Sol no céu — posição fixa, sempre visível -->
      <!-- Núcleo brilhante -->
      <TresMesh :position="[-12, 22, -25]">
        <TresSphereGeometry :args="[4.5, 32, 32]" />
        <TresMeshBasicMaterial color="#FFF176" />
      </TresMesh>
      <!-- Halo externo suave -->
      <TresMesh :position="[-12, 22, -25]">
        <TresSphereGeometry :args="[6.5, 32, 32]" />
        <TresMeshBasicMaterial color="#FFEE58" :transparent="true" :opacity="0.25" />
      </TresMesh>

      <Diorama :palette="activePalette" :build-step="buildStep" />
      <Rain :intensity="stormIntensity" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.scene-3d {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* CSS transition handles smooth sky gradient changes without JS rAF */
  transition: background 0.8s ease;
}
.scene-3d :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
