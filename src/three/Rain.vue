<script setup>
// GPU-friendly rain using InstancedMesh.
import { shallowRef, watch, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  intensity: { type: Number, default: 0 }, // 0..1
  area: { type: Number, default: 18 },
  maxDrops: { type: Number, default: 2400 },
})

const meshRef = shallowRef(null)
const dummy = new THREE.Object3D()
const drops = []
let raf
let last = 0

// Build the InstancedMesh manually (no TresInstancedMesh wrapper in cientos v5)
const geometry = new THREE.CylinderGeometry(1, 1, 1, 4)
const material = new THREE.MeshBasicMaterial({
  color: '#b8d0ee',
  transparent: true,
  opacity: 0.70,
})
const rainMesh = new THREE.InstancedMesh(geometry, material, props.maxDrops)
rainMesh.frustumCulled = false
rainMesh.visible = false

function init() {
  drops.length = 0
  for (let i = 0; i < props.maxDrops; i++) {
    drops.push({
      x: (Math.random() - 0.5) * props.area,
      y: Math.random() * 10 + 2,
      z: (Math.random() - 0.5) * props.area,
      vy: 10 + Math.random() * 8,
      vx: 2.0 + Math.random() * 1.2,
    })
  }
  // Reset instance matrices
  for (let i = 0; i < props.maxDrops; i++) {
    dummy.position.set(0, -100, 0)
    dummy.scale.set(0, 0, 0)
    dummy.updateMatrix()
    rainMesh.setMatrixAt(i, dummy.matrix)
  }
  rainMesh.instanceMatrix.needsUpdate = true
}

function tick(t) {
  if (!rainMesh) {
    raf = requestAnimationFrame(tick)
    return
  }
  const dt = Math.min(0.05, (t - last) / 1000)
  last = t

  const visible = Math.floor(props.maxDrops * props.intensity)
  for (let i = 0; i < props.maxDrops; i++) {
    const d = drops[i]
    if (i < visible && props.intensity > 0) {
      d.y -= d.vy * dt
      d.x += d.vx * dt * props.intensity
      if (d.y < 0.1) {
        d.y = 7 + Math.random() * 2
        d.x = (Math.random() - 0.5) * props.area
        d.z = (Math.random() - 0.5) * props.area
      }
      dummy.position.set(d.x, d.y, d.z)
      dummy.rotation.set(0, 0, 0.28) // wind tilt
      dummy.scale.set(0.02, 0.32 + Math.random() * 0.18, 0.02)
      dummy.updateMatrix()
      rainMesh.setMatrixAt(i, dummy.matrix)
    } else {
      // park far off-camera
      dummy.position.set(0, -100, 0)
      dummy.scale.set(0, 0, 0)
      dummy.updateMatrix()
      rainMesh.setMatrixAt(i, dummy.matrix)
    }
  }
  rainMesh.instanceMatrix.needsUpdate = true
  rainMesh.visible = props.intensity > 0.01
  raf = requestAnimationFrame(tick)
}

watch(() => props.maxDrops, init)

onMounted(() => {
  init()
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <primitive :object="rainMesh" />
</template>
