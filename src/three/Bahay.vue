<script setup>
// Bahay kubo with two visual variants: "decay" (poverty) and "kept" (post-solar).
// `decay` controls how leaned / messed up the roof looks (0..1).
import { computed } from 'vue'

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  rotation: { type: Number, default: 0 },
  scale: { type: Number, default: 1 },
  palette: { type: Object, required: true },
  withPanel: { type: Boolean, default: true },
  panelDescent: { type: Number, default: 1 }, // 0 = panel floating above, 1 = panel installed
  visible: { type: Boolean, default: true },
  decay: { type: Number, default: 0 }, // 0..1, how broken-down the house looks
  seed: { type: Number, default: 0 },
})

// Mix decay color with kept color
const mix = (a, b, t) => {
  if (!a || !b) return a || b
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

const wallColor = computed(() =>
  mix(props.palette.wall, props.palette.wallDecay || props.palette.wall, props.decay),
)
const roofColor = computed(() =>
  mix(props.palette.roof, props.palette.roofDecay || props.palette.roof, props.decay),
)
// Window glow: dark when decayed, hot golden when lit.
// Always rendered with MeshBasicMaterial so it shines regardless of lighting.
const windowDark = '#2a2218'
const windowLit = computed(() => props.palette.window)
const windowGlow = computed(() => {
  // Intensity from palette emissive, reduced by decay
  const t = Math.max(0, Math.min(1, (props.palette.windowEmissive || 0) / 2.5)) * (1 - props.decay)
  return mix(windowDark, windowLit.value, t)
})
const panelColor = computed(() => props.palette.panel)
const panelEmissive = computed(
  () => (props.palette.panelEmissive || 0) * (props.palette.panelOpacity ?? 1),
)
const panelOpacity = computed(() => props.palette.panelOpacity ?? 1)

// Roof slightly tilted when decayed
const roofTilt = computed(() => props.decay * (0.18 + props.seed * 0.05))
const roofY = computed(() => 1.55 - props.decay * 0.05)

// Panel "drops" from above as panelDescent goes 0 → 1.
// Final installed Y must be ABOVE the roof so it stays visible.
const panelY = computed(() => 2.0 + (1 - props.panelDescent) * 2.4)
</script>

<template>
  <TresGroup :position="position" :rotation="[0, rotation, 0]" :scale="scale" :visible="visible">
    <!-- Stilts -->
    <TresMesh :position="[-0.7, 0.3, -0.5]">
      <TresCylinderGeometry :args="[0.06, 0.06, 0.6, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>
    <TresMesh :position="[0.7, 0.3, -0.5]">
      <TresCylinderGeometry :args="[0.06, 0.06, 0.6, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>
    <TresMesh :position="[-0.7, 0.3, 0.5]">
      <TresCylinderGeometry :args="[0.06, 0.06, 0.6, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>
    <TresMesh :position="[0.7, 0.3, 0.5]">
      <TresCylinderGeometry :args="[0.06, 0.06, 0.6, 6]" />
      <TresMeshStandardMaterial color="#3a2818" />
    </TresMesh>

    <!-- Body -->
    <TresMesh :position="[0, 0.85, 0]">
      <TresBoxGeometry :args="[1.6, 0.9, 1.2]" />
      <TresMeshStandardMaterial :color="wallColor" :roughness="0.95" />
    </TresMesh>

    <!-- Door -->
    <TresMesh :position="[0, 0.7, 0.61]">
      <TresBoxGeometry :args="[0.25, 0.45, 0.02]" />
      <TresMeshStandardMaterial color="#2b1d12" />
    </TresMesh>

    <!-- Front windows -->
    <TresMesh :position="[-0.45, 0.95, 0.61]">
      <TresBoxGeometry :args="[0.25, 0.25, 0.02]" />
      <TresMeshBasicMaterial :color="windowGlow" />
    </TresMesh>
    <TresMesh :position="[0.45, 0.95, 0.61]">
      <TresBoxGeometry :args="[0.25, 0.25, 0.02]" />
      <TresMeshBasicMaterial :color="windowGlow" />
    </TresMesh>
    <!-- Side windows -->
    <TresMesh :position="[0.81, 0.95, 0]">
      <TresBoxGeometry :args="[0.02, 0.3, 0.4]" />
      <TresMeshBasicMaterial :color="windowGlow" />
    </TresMesh>
    <TresMesh :position="[-0.81, 0.95, 0]">
      <TresBoxGeometry :args="[0.02, 0.3, 0.4]" />
      <TresMeshBasicMaterial :color="windowGlow" />
    </TresMesh>

    <!-- Roof (tilts slightly when decayed) -->
    <TresMesh :position="[0, roofY, 0]" :rotation="[roofTilt, Math.PI / 4, roofTilt * 0.5]">
      <TresConeGeometry :args="[1.25, 0.7, 4]" />
      <TresMeshStandardMaterial :color="roofColor" :roughness="1" :flat-shading="true" />
    </TresMesh>

    <!-- Solar panel — fades in + descends from sky onto the roof -->
    <TresGroup
      v-if="withPanel"
      :position="[0, panelY, 0]"
      :rotation="[-0.25, Math.PI / 4, 0]"
      :visible="panelOpacity > 0.02"
    >
      <!-- Frame -->
      <TresMesh>
        <TresBoxGeometry :args="[1.4, 0.06, 0.9]" />
        <TresMeshStandardMaterial
          color="#9aa0a8"
          :metalness="0.7"
          :roughness="0.3"
          :transparent="true"
          :opacity="panelOpacity"
        />
      </TresMesh>
      <!-- Glass surface -->
      <TresMesh :position="[0, 0.035, 0]">
        <TresBoxGeometry :args="[1.3, 0.02, 0.8]" />
        <TresMeshStandardMaterial
          :color="panelColor"
          :emissive="panelColor"
          :emissive-intensity="panelEmissive * 2"
          :metalness="0.85"
          :roughness="0.12"
          :transparent="true"
          :opacity="panelOpacity"
        />
      </TresMesh>
      <!-- Grid lines on glass -->
      <TresMesh :position="[0, 0.048, 0]" :rotation="[-Math.PI / 2, 0, 0]">
        <TresPlaneGeometry :args="[1.3, 0.8]" />
        <TresMeshBasicMaterial
          color="#0a1830"
          :opacity="0.25 * panelOpacity"
          :transparent="true"
          :wireframe="true"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
