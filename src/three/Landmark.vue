<script setup>
// Larger structure: school OR market OR clinic — picked by `kind`.
import { computed } from 'vue'

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  rotation: { type: Number, default: 0 },
  palette: { type: Object, required: true },
  visible: { type: Boolean, default: true },
  kind: { type: String, default: 'school' }, // school | market | clinic
})

const wallColor = computed(() => {
  if (props.kind === 'school') return '#e6d2a8'
  if (props.kind === 'clinic') return '#ecece6'
  return props.palette.wall
})
const roofColor = computed(() => {
  if (props.kind === 'school') return '#3a5a82'
  if (props.kind === 'clinic') return '#b22535'
  return '#7a3a20'
})
const accent = computed(() => (props.kind === 'school' ? '#1e3a5f' : '#c7522a'))

// Window glow always renders bright via BasicMaterial
function mix(a, b, t) {
  const ah = parseInt(a.replace('#', ''), 16)
  const bh = parseInt(b.replace('#', ''), 16)
  const ar = (ah >> 16) & 0xff
  const ag = (ah >> 8) & 0xff
  const ab = ah & 0xff
  const br = (bh >> 16) & 0xff
  const bg = (bh >> 8) & 0xff
  const bb = bh & 0xff
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const c = Math.round(ab + (bb - ab) * t)
  return '#' + ((r << 16) | (g << 8) | c).toString(16).padStart(6, '0')
}
const windowGlow = computed(() => {
  const t = Math.max(0, Math.min(1, (props.palette.windowEmissive || 0) / 2.5))
  return mix('#2a2218', props.palette.window, t)
})
</script>

<template>
  <TresGroup :position="position" :rotation="[0, rotation, 0]" :visible="visible">
    <!-- Main hall -->
    <TresMesh :position="[0, 0.9, 0]">
      <TresBoxGeometry :args="[2.6, 1.2, 1.6]" />
      <TresMeshStandardMaterial :color="wallColor" :roughness="0.85" />
    </TresMesh>
    <!-- Roof -->
    <TresMesh :position="[0, 1.6, 0]" :rotation="[0, 0, 0]">
      <TresBoxGeometry :args="[2.7, 0.18, 1.7]" />
      <TresMeshStandardMaterial :color="roofColor" :roughness="0.9" />
    </TresMesh>
    <!-- Awning -->
    <TresMesh :position="[0, 1.05, 0.85]" :rotation="[0.35, 0, 0]">
      <TresBoxGeometry :args="[2.4, 0.04, 0.6]" />
      <TresMeshStandardMaterial :color="accent" :roughness="0.6" />
    </TresMesh>
    <!-- Pillars under awning -->
    <TresMesh :position="[-1.0, 0.6, 1.1]">
      <TresCylinderGeometry :args="[0.05, 0.05, 1.1, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>
    <TresMesh :position="[1.0, 0.6, 1.1]">
      <TresCylinderGeometry :args="[0.05, 0.05, 1.1, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>

    <!-- Windows row (front) -->
    <TresMesh v-for="i in 3" :key="i" :position="[(i - 2) * 0.7, 1.0, 0.81]">
      <TresBoxGeometry :args="[0.4, 0.45, 0.02]" />
      <TresMeshBasicMaterial :color="windowGlow" />
    </TresMesh>

    <!-- Solar panels on roof (school + clinic) -->
    <TresGroup v-if="kind !== 'market'" :position="[0, 1.72, 0]" :rotation="[-0.35, 0, 0]">
      <TresMesh>
        <TresBoxGeometry :args="[2, 0.04, 0.8]" />
        <TresMeshStandardMaterial
          :color="palette.panel"
          :emissive="palette.panel"
          :emissive-intensity="palette.panelEmissive"
          :metalness="0.4"
          :roughness="0.3"
        />
      </TresMesh>
    </TresGroup>

    <!-- Sign (school flag / clinic cross) -->
    <TresMesh v-if="kind === 'school'" :position="[-1.15, 2.0, 0]">
      <TresBoxGeometry :args="[0.02, 0.5, 0.02]" />
      <TresMeshStandardMaterial color="#1a1208" />
    </TresMesh>
    <TresMesh v-if="kind === 'school'" :position="[-1.0, 2.2, 0]">
      <TresBoxGeometry :args="[0.3, 0.18, 0.02]" />
      <TresMeshStandardMaterial color="#f97316" />
    </TresMesh>
    <TresMesh v-if="kind === 'clinic'" :position="[0, 1.75, 0.82]">
      <TresBoxGeometry :args="[0.32, 0.08, 0.02]" />
      <TresMeshBasicMaterial color="#b22535" />
    </TresMesh>
    <TresMesh v-if="kind === 'clinic'" :position="[0, 1.75, 0.82]">
      <TresBoxGeometry :args="[0.08, 0.32, 0.02]" />
      <TresMeshBasicMaterial color="#b22535" />
    </TresMesh>
  </TresGroup>
</template>
