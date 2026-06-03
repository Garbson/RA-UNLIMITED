<script setup>
// Smoothly drives a PerspectiveCamera around the island based on `targetView`.
import { useTresContext } from '@tresjs/core'
import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Camera target view, expressed as { position: [x,y,z], lookAt: [x,y,z] }.
  view: {
    type: Object,
    required: true,
  },
  // Smoothing factor 0..1 — higher = snappier
  lerp: { type: Number, default: 0.07 },
})

const { camera } = useTresContext()
const tmpPos = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()
const currentTarget = new THREE.Vector3(0, 0.8, 0)

let raf

function tick() {
  if (camera.value) {
    tmpPos.set(...props.view.position)
    tmpTarget.set(...props.view.lookAt)
    camera.value.position.lerp(tmpPos, props.lerp)
    currentTarget.lerp(tmpTarget, props.lerp)
    camera.value.lookAt(currentTarget)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (camera.value) {
    camera.value.position.set(...props.view.position)
    currentTarget.set(...props.view.lookAt)
    camera.value.lookAt(currentTarget)
  }
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <slot />
</template>
