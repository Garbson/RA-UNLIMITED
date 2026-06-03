<script setup>
// Loads and renders a 3D model. Each instance gets its own clone.
// `visible` is applied directly to the Three.js Object3D so it actually hides.
// `tintColor` recolors any meshes that lack proper materials (e.g. raw FBX trees).
import { Color, MeshStandardMaterial } from 'three'
import { shallowRef, watch, watchEffect, computed } from 'vue'
import { loadFBX, loadGLB, loadOBJ } from './ModelLoaders.js'

const props = defineProps({
  url: { type: String, required: true },
  type: { type: String, default: 'fbx' }, // 'fbx' | 'obj' | 'glb'
  mtlUrl: { type: String, default: null },
  targetSize: { type: Number, default: 2 },
  position: { type: Array, default: () => [0, 0, 0] },
  rotation: { type: Number, default: 0 },
  scale: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
  // If set, every mesh that has no proper material color (or pure black) gets this color.
  fallbackColor: { type: String, default: null },
})

const instance = shallowRef(null)

watchEffect(async () => {
  let loader
  if (props.type === 'obj')
    loader = loadOBJ(props.url, { mtlUrl: props.mtlUrl, targetSize: props.targetSize })
  else if (props.type === 'glb') loader = loadGLB(props.url, { targetSize: props.targetSize })
  else loader = loadFBX(props.url, { targetSize: props.targetSize })
  try {
    const master = await loader
    const clone = master.clone(true)
    if (props.fallbackColor) {
      const tint = new Color(props.fallbackColor)
      clone.traverse((obj) => {
        if (obj.isMesh) {
          const mat = obj.material
          if (!mat || (Array.isArray(mat) ? mat.length === 0 : !mat.color)) {
            obj.material = new MeshStandardMaterial({ color: tint, roughness: 0.85 })
          } else if (mat.color && mat.color.r < 0.1 && mat.color.g < 0.1 && mat.color.b < 0.1) {
            // black material → replace
            obj.material = new MeshStandardMaterial({ color: tint, roughness: 0.85 })
          }
        }
      })
    }
    clone.visible = props.visible
    instance.value = clone
  } catch (e) {
    console.error('[Model] failed to load', props.url, e)
  }
})

// Reactively keep the cloned object's visibility in sync with the prop.
watch(
  () => props.visible,
  (v) => {
    if (instance.value) instance.value.visible = v
  },
)

// Stable rotation array — prevents new array on every render (avoids TresJS patch storms)
const rot = computed(() => [0, props.rotation, 0])
</script>

<template>
  <!-- v-memo: skip VNode patching when only visible changes (handled by the watch above).
       instance, position, rotation, scale are stable during scroll updates. -->
  <TresGroup
    v-if="instance"
    v-memo="[instance, position, rot, scale]"
    :position="position"
    :rotation="rot"
    :scale="scale"
  >
    <primitive :object="instance" />
  </TresGroup>
</template>
