<script setup>
// Procedural coconut palm tree. Trunk = stacked cylinders for a curve;
// leaves = elongated planes radiating from the top.
import { computed } from 'vue'

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Number, default: 1 },
  palette: { type: Object, required: true },
  visible: { type: Boolean, default: true },
  seed: { type: Number, default: 0 },
})

const leafColor = computed(() => props.palette.leaves)
const trunkColor = '#6b5236'

const leaves = computed(() => {
  // Create N leaves around top
  const N = 7
  const arr = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + props.seed * 0.13
    arr.push({
      rotation: [Math.PI * 0.32 + Math.sin(i + props.seed) * 0.05, a, 0],
      key: i,
    })
  }
  return arr
})
</script>

<template>
  <TresGroup :position="position" :scale="scale" :visible="visible">
    <!-- Trunk: 4 stacked tilted segments -->
    <TresMesh :position="[0, 0.4, 0]" :rotation="[0, 0, 0.04]">
      <TresCylinderGeometry :args="[0.07, 0.09, 0.8, 7]" />
      <TresMeshStandardMaterial :color="trunkColor" :roughness="0.95" />
    </TresMesh>
    <TresMesh :position="[0.04, 1.15, 0]" :rotation="[0, 0, 0.07]">
      <TresCylinderGeometry :args="[0.06, 0.07, 0.8, 7]" />
      <TresMeshStandardMaterial :color="trunkColor" :roughness="0.95" />
    </TresMesh>
    <TresMesh :position="[0.1, 1.9, 0]" :rotation="[0, 0, 0.12]">
      <TresCylinderGeometry :args="[0.05, 0.06, 0.7, 7]" />
      <TresMeshStandardMaterial :color="trunkColor" :roughness="0.95" />
    </TresMesh>

    <!-- Leaves group -->
    <TresGroup :position="[0.15, 2.25, 0]">
      <TresMesh v-for="l in leaves" :key="l.key" :rotation="l.rotation">
        <TresConeGeometry :args="[0.18, 1.2, 4]" />
        <TresMeshStandardMaterial :color="leafColor" :flat-shading="true" :roughness="0.7" />
      </TresMesh>
      <!-- Coconuts -->
      <TresMesh :position="[0.06, -0.05, 0.06]">
        <TresSphereGeometry :args="[0.07, 8, 6]" />
        <TresMeshStandardMaterial color="#3e2a18" :roughness="0.9" />
      </TresMesh>
      <TresMesh :position="[-0.06, -0.04, -0.05]">
        <TresSphereGeometry :args="[0.06, 8, 6]" />
        <TresMeshStandardMaterial color="#3e2a18" :roughness="0.9" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
