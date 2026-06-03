// Simple module-level cache + loaders for FBX and OBJ.
// Returns Three.js Object3D you can `<primitive :object="model" />` into a TresJS scene.
import { Box3, Vector3 } from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const cache = new Map()

function centerAndScale(object, targetSize = 2) {
  // Auto-center on origin (x,z) and resting on ground (y=0).
  const box = new Box3().setFromObject(object)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  // Scale so the biggest horizontal dimension equals targetSize
  const longest = Math.max(size.x, size.z) || 1
  const scale = targetSize / longest
  object.scale.setScalar(scale)
  // After scaling, reposition: x,z center to 0; y bottom to 0
  const box2 = new Box3().setFromObject(object)
  const c2 = box2.getCenter(new Vector3())
  object.position.x -= c2.x
  object.position.z -= c2.z
  object.position.y -= box2.min.y
  return object
}

export function loadFBX(url, { targetSize = 2 } = {}) {
  const key = `fbx:${url}:${targetSize}`
  if (cache.has(key)) return cache.get(key)
  const promise = new Promise((resolve, reject) => {
    new FBXLoader().load(
      url,
      (object) => {
        centerAndScale(object, targetSize)
        resolve(object)
      },
      undefined,
      reject,
    )
  })
  cache.set(key, promise)
  return promise
}

export function loadGLB(url, { targetSize = 2 } = {}) {
  const key = `glb:${url}:${targetSize}`
  if (cache.has(key)) return cache.get(key)
  const promise = new Promise((resolve, reject) => {
    new GLTFLoader().load(
      url,
      (gltf) => {
        const object = gltf.scene || gltf.scenes?.[0]
        centerAndScale(object, targetSize)
        resolve(object)
      },
      undefined,
      reject,
    )
  })
  cache.set(key, promise)
  return promise
}

export function loadOBJ(url, { mtlUrl, targetSize = 2 } = {}) {
  const key = `obj:${url}:${mtlUrl || ''}:${targetSize}`
  if (cache.has(key)) return cache.get(key)
  const promise = new Promise((resolve, reject) => {
    const finish = (loader) => {
      loader.load(
        url,
        (object) => {
          centerAndScale(object, targetSize)
          resolve(object)
        },
        undefined,
        reject,
      )
    }
    if (mtlUrl) {
      new MTLLoader().load(
        mtlUrl,
        (materials) => {
          materials.preload()
          const objLoader = new OBJLoader().setMaterials(materials)
          finish(objLoader)
        },
        undefined,
        reject,
      )
    } else {
      finish(new OBJLoader())
    }
  })
  cache.set(key, promise)
  return promise
}
