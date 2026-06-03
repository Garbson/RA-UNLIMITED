<script setup>
// Village diorama — models revealed step by step via buildStep (0..5).
import { computed } from 'vue'
import Model from './Model.vue'

const props = defineProps({
  palette: { type: Object, required: true },
  buildStep: { type: Number, default: 0 },
})

// ── CABANAS (pobreza) — 3 no início (step 0), +3 no step 1, somem no step 2 ──
const huts = [
  { url: 'cabin_shed.fbx', pos: [-4.5, 0, -2.0], rot: 1.57, target: 1.4, from: 0, until: 2 },
  { url: 'storage_hut.fbx', pos: [4.5, 0, -2.0], rot: -1.57, target: 1.4, from: 0, until: 2 },
  { url: 'cabin_shed.fbx', pos: [-4.5, 0, 2.0], rot: 1.57, target: 1.3, from: 0, until: 2 },
  { url: 'storage_hut.fbx', pos: [4.5, 0, 2.0], rot: -1.57, target: 1.3, from: 1, until: 2 },
  { url: 'cabin_shed.fbx', pos: [0.0, 0, -5.0], rot: 0.0, target: 1.4, from: 1, until: 2 },
  { url: 'storage_hut.fbx', pos: [-2.0, 0, -5.0], rot: 0.0, target: 1.3, from: 1, until: 2 },
]

// ── CASAS MELHORES — surgem progressivamente a partir do step 2 (19 casas no total) ────────────────────────────────
const houses = [
  // Step 2: Primeira onda de habitações modernas (5 casas nos mesmos locais das cabanas)
  { url: 'house_a.fbx', pos: [-4.5, 0, -2.0], rot: 1.57, target: 1.8, from: 2 },
  { url: 'house_b.fbx', pos: [4.5, 0, -2.0], rot: -1.57, target: 1.8, from: 2 },
  { url: 'house_a.fbx', pos: [-4.5, 0, 2.0], rot: 1.57, target: 1.8, from: 2 },
  { url: 'house_b.fbx', pos: [4.5, 0, 2.0], rot: -1.57, target: 1.8, from: 2 },
  { url: 'house_a.fbx', pos: [0.0, 0, -5.0], rot: 0.0, target: 1.8, from: 2 },

  // Step 3: Expansão urbana (5 novas casas)
  { url: 'house_b.fbx', pos: [-6.5, 0, -2.0], rot: 1.57, target: 1.8, from: 3 },
  { url: 'house_a.fbx', pos: [6.5, 0, -2.0], rot: -1.57, target: 1.8, from: 3 },
  { url: 'house_b.fbx', pos: [-6.5, 0, 2.0], rot: 1.57, target: 1.8, from: 3 },
  { url: 'house_a.fbx', pos: [6.5, 0, 2.0], rot: -1.57, target: 1.8, from: 3 },
  { url: 'house_b.fbx', pos: [-2.0, 0, -5.0], rot: 0.0, target: 1.6, from: 3 },

  // Step 4: Crescimento residencial e estrutural (5 novas casas)
  { url: 'house_a.fbx', pos: [-4.5, 0, 5.0], rot: 3.14, target: 1.7, from: 4 },
  { url: 'house_b.fbx', pos: [4.5, 0, 5.0], rot: 3.14, target: 1.7, from: 4 },
  { url: 'house_a.fbx', pos: [-6.5, 0, 5.0], rot: 3.14, target: 1.7, from: 4 },
  { url: 'house_b.fbx', pos: [6.5, 0, 5.0], rot: 3.14, target: 1.7, from: 4 },
  { url: 'house_a.fbx', pos: [2.0, 0, -5.0], rot: 0.0, target: 1.6, from: 4 },

  // Step 5: Vila sustentável consolidada (4 novas casas nos espaços restantes)
  { url: 'house_b.fbx', pos: [-2.0, 0, 6.5], rot: 3.14, target: 1.6, from: 5 },
  { url: 'house_a.fbx', pos: [2.0, 0, 6.5], rot: 3.14, target: 1.6, from: 5 },
  { url: 'house_b.fbx', pos: [-4.0, 0, -7.0], rot: 0.0, target: 1.6, from: 5 },
  { url: 'house_a.fbx', pos: [0.0, 0, -7.0], rot: 0.0, target: 1.6, from: 5 },
]

// ── LANDMARKS ─────────────────────────────────────────────────────────────────
const showSchool = computed(() => props.buildStep >= 3)
const showInn = computed(() => props.buildStep >= 4)
const showClinic = computed(() => props.buildStep >= 5)
const showMarket = computed(() => props.buildStep >= 5)

// ── POSTES DE LUZ (aparecem gradualmente a partir do step 2 - 12 postes no total) ──
const streetLights = [
  // Step 2: Início da iluminação (2 postes no eixo central)
  { pos: [-1.0, 0, 0.0], from: 2 },
  { pos: [1.0, 0, 1.5], from: 2 },

  // Step 3: Expansão para bairros principais (5 postes total)
  { pos: [-1.0, 0, 3.0], from: 3 },
  { pos: [1.0, 0, 3.0], from: 3 },
  { pos: [-4.0, 0, 0.0], from: 3 },

  // Step 4: Desenvolvimento (8 postes total)
  { pos: [4.0, 0, 0.0], from: 4 },
  { pos: [-4.0, 0, 3.5], from: 4 },
  { pos: [0.0, 0, -3.5], from: 4 },

  // Step 5: Plena iluminação da vila (12 postes total)
  { pos: [4.0, 0, 3.5], from: 5 },
  { pos: [-2.0, 0, -6.0], from: 5 },
  { pos: [2.0, 0, -6.0], from: 5 },
  { pos: [0.0, 0, 5.5], from: 5 },
]

// ── PLACAS SOLARES (fazenda solar, cresce a partir do step 2) ─────────────────
const solarPanels = [
  { pos: [6.5, 0, -6.0], rot: 0.2, target: 1.3, from: 2 },
  { pos: [8.0, 0, -6.0], rot: 0.2, target: 1.3, from: 2 },
  { pos: [6.5, 0, -7.5], rot: 0.2, target: 1.3, from: 3 },
  { pos: [8.0, 0, -7.5], rot: 0.2, target: 1.3, from: 3 },
  { pos: [6.5, 0, -9.0], rot: 0.2, target: 1.3, from: 4 },
  { pos: [8.0, 0, -9.0], rot: 0.2, target: 1.3, from: 4 },
  { pos: [9.5, 0, -6.0], rot: 0.2, target: 1.3, from: 5 },
  { pos: [9.5, 0, -7.5], rot: 0.2, target: 1.3, from: 5 },
]

// ── ÁRVORES ───────────────────────────────────────────────────────────────────
const trees = [
  // sempre visíveis (from=0)
  { pos: [-10.0, 0, 6.0], rot: 0.3, from: 0 },
  { pos: [10.0, 0, 5.5], rot: -0.4, from: 0 },
  { pos: [-12.0, 0, 6.0], rot: 0.3, from: 0 },
  { pos: [12.0, 0, 5.5], rot: -0.4, from: 0 },
  { pos: [-10.5, 0, -4.0], rot: 0.7, from: 0 },
  { pos: [-10.5, 0, -4.0], rot: 0.7, from: 0 },
  { pos: [10.5, 0, -3.5], rot: -0.8, from: 0 },
  { pos: [1.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [3.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [5.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [6.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [7.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-1.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-3.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-5.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-6.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-7.0, 0, 11.0], rot: 0.1, from: 0 },
  { pos: [-1.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [-3.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [-5.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [-6.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [-8.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [1.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [3.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [5.0, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [4.5, 0, -11.0], rot: 0.1, from: 0 },
  { pos: [11.0, 0, -9.5], rot: 0.1, from: 0 },
  { pos: [11.5, 0, -6.5], rot: 0.1, from: 0 },
  { pos: [12.0, 0, -9.0], rot: 0.1, from: 0 },
  { pos: [14.0, 0, -9.0], rot: 0.1, from: 0 },
  { pos: [16.0, 0, -8.0], rot: 0.1, from: 0 },
  { pos: [18.0, 0, -7.0], rot: 0.1, from: 0 },
  { pos: [18.0, 0, -2.0], rot: 0.1, from: 0 },
  { pos: [-12.0, 0, 1.0], rot: 0.2, from: 0 },
  { pos: [12.0, 0, 1.0], rot: -0.2, from: 0 },
  { pos: [-12.0, 0, 1.0], rot: 0.2, from: 0 },
  { pos: [12.0, 0, 1.0], rot: -0.2, from: 0 },
  { pos: [-14.0, 0, 1.0], rot: 0.2, from: 0 },
  { pos: [14.0, 0, 1.0], rot: -0.2, from: 0 },
  { pos: [-16.0, 0, 1.0], rot: 0.2, from: 0 },
  { pos: [16.0, 0, 1.0], rot: -0.2, from: 0 },
  { pos: [-18.0, 0, 1.0], rot: 0.2, from: 0 },
  { pos: [18.0, 0, 1.0], rot: -0.2, from: 0 },
  // extras a partir step 3
  { pos: [-7.0, 0, 9.0], rot: 0.5, from: 3 },
  { pos: [7.0, 0, 9.0], rot: -0.5, from: 3 },
  { pos: [-8.5, 0, 5.5], rot: 0.6, from: 3 },
  { pos: [8.5, 0, 5.5], rot: -0.6, from: 3 },
  { pos: [-6.0, 0, -6.5], rot: 0.9, from: 3 },
  { pos: [11.0, 0, -5.0], rot: -0.9, from: 3 },
  { pos: [-5.5, 0, -8.5], rot: 1.0, from: 3 },
  { pos: [12.0, 0, -4.5], rot: -1.0, from: 3 },
]

// Terra fica mais verde na prosperidade
const groundColor = computed(() => {
  const s = props.buildStep
  return s >= 3 ? '#6aad40' : s >= 1 ? '#5a9030' : '#4a7a26'
})
</script>

<template>
  <TresGroup>
    <!-- ── BASE DA TERRA (menor e mais achatada → câmera parece mais longe) ── -->
    <TresMesh :position="[0, -0.5, 0]">
      <TresCylinderGeometry :args="[10, 20, 1.0, 18]" />
      <TresMeshStandardMaterial color="#3a2a14" :roughness="0" />
    </TresMesh>
    <!-- Grama verde -->
    <TresMesh :position="[0, 0.05, 0]">
      <TresCylinderGeometry :args="[20, 11.5, 0.08, 64]" />
      <TresMeshStandardMaterial :color="groundColor" :roughness="0.9" />
    </TresMesh>

    <!-- ── CABANAS (pobreza) ── -->
    <Model
      v-for="(h, i) in huts"
      :key="`hut-${i}`"
      type="fbx"
      :url="`/models/${h.url}`"
      :target-size="h.target"
      :position="h.pos"
      :rotation="h.rot"
      :visible="buildStep >= h.from && buildStep < h.until"
    />

    <!-- ── CASAS MELHORES (prosperity) ── -->
    <Model
      v-for="(h, i) in houses"
      :key="`house-${i}`"
      type="fbx"
      :url="`/models/${h.url}`"
      :target-size="h.target"
      :position="h.pos"
      :rotation="h.rot"
      :visible="buildStep >= h.from"
    />

    <!-- ── ESCOLA (step 3) — sempre montado, visibilidade por prop ── -->
    <Model
      type="obj"
      url="/models/large_building.obj"
      mtl-url="/models/large_building.mtl"
      :target-size="2.8"
      :position="[2.0, 0, 0.0]"
      :rotation="1.57"
      :visible="showSchool"
    />

    <!-- ── INN / CENTRO COMUNITÁRIO (step 4) ── -->
    <Model
      type="fbx"
      url="/models/inn.fbx"
      :target-size="2.2"
      :position="[-2.0, 0, 0.0]"
      :rotation="-1.57"
      :visible="showInn"
    />

    <!-- ── CLÍNICA (step 5) ── -->
    <Model
      type="obj"
      url="/models/small_building.obj"
      mtl-url="/models/small_building.mtl"
      :target-size="1.8"
      :position="[2.0, 0, 3.0]"
      :rotation="1.57"
      :visible="showClinic"
    />

    <!-- ── MERCADO (step 5) ── -->
    <Model
      type="obj"
      url="/models/small_building.obj"
      mtl-url="/models/small_building.mtl"
      :target-size="1.8"
      :position="[-2.0, 0, 3.0]"
      :rotation="-1.57"
      :visible="showMarket"
    />

    <!-- ── POSTES DE LUZ + ponto de luz (aparecem a partir do step correspondente) ── -->
    <template v-for="(sl, i) in streetLights" :key="`sl-${i}`">
      <Model
        type="fbx"
        url="/models/street_light.fbx"
        :target-size="0.5"
        :position="sl.pos"
        :rotation="0"
        fallback-color="#555555"
        :visible="buildStep >= sl.from"
      />
      <TresPointLight
        v-if="buildStep >= sl.from"
        :position="[sl.pos[0], 1.8, sl.pos[2]]"
        color="#ffd382"
        :intensity="1.2"
        :distance="5"
      />
    </template>

    <!-- ── FAZENDA DE PLACAS SOLARES (cresce a partir do step 2) ── -->
    <Model
      v-for="(sp, i) in solarPanels"
      :key="`solar-${i}`"
      type="fbx"
      url="/models/solar_panel_roof.fbx"
      :target-size="sp.target"
      :position="sp.pos"
      :rotation="sp.rot"
      :visible="buildStep >= sp.from"
    />

    <!-- ── ÁRVORES — fallback verde (tronco) ── -->
    <Model
      v-for="(t, i) in trees"
      :key="`tree-${i}`"
      type="obj"
      url="/models/tree01.obj"
      mtl-url="/models/tree01.mtl"
      :target-size="2.0"
      :position="t.pos"
      :rotation="t.rot"
      :visible="buildStep >= t.from"
      fallback-color="#3d6b22"
    />

    <!-- ── LUZ DE PREENCHIMENTO DA VILA ── -->
    <TresPointLight
      :position="[0, 3, 0]"
      :color="palette.window"
      :intensity="palette.windowEmissive * 0.4"
      :distance="20"
    />
  </TresGroup>
</template>
