<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Scene3D from '../three/Scene3D.vue'
import SiteNav from '../components/SiteNav.vue'
import ProgressDots from '../components/ProgressDots.vue'
import Counter from '../components/Counter.vue'
import PartnerModal from '../components/PartnerModal.vue'
import T from '../components/T.vue'
import { counters } from '../data/story.js'

// ── Scroll progress 0..1 ──────────────────────────────────────────────────────
const scrollProgress = ref(0)

// ── Scene state ───────────────────────────────────────────────────────────────
const mood = ref('dark')
const buildStep = ref(0)
const stormIntensity = ref(0)
const shake = ref(0)
const cameraKey = ref(1)
const cameraProgress = ref(0)

// ── Keyframes: scroll progress → scene state ──────────────────────────────────
// Each frame: { p, mood, bs(buildStep), storm, shake, cam, cp(cameraProgress) }
// Act 2 is spread wide (0.18–0.55) so each buildStep gets ~250px of scroll
const KF = [
  // Act 1 — dark, empty village
  { p: 0.00, mood: 'dark',       bs: 0, storm: 0,   shake: 0,   cam: 1, cp: 0.50 },
  { p: 0.17, mood: 'dark',       bs: 0, storm: 0,   shake: 0,   cam: 1, cp: 0.50 },
  // Act 2 — village grows step by step
  { p: 0.20, mood: 'poverty',    bs: 0, storm: 0,   shake: 0,   cam: 2, cp: 0.38 },
  { p: 0.26, mood: 'poverty',    bs: 1, storm: 0,   shake: 0,   cam: 2, cp: 0.40 },
  { p: 0.32, mood: 'awakening',  bs: 2, storm: 0,   shake: 0,   cam: 2, cp: 0.43 },
  { p: 0.38, mood: 'awakening',  bs: 3, storm: 0,   shake: 0,   cam: 2, cp: 0.46 },
  { p: 0.44, mood: 'awakening',  bs: 4, storm: 0,   shake: 0,   cam: 2, cp: 0.50 },
  { p: 0.50, mood: 'prosperous', bs: 5, storm: 0,   shake: 0,   cam: 2, cp: 0.54 },
  { p: 0.55, mood: 'prosperous', bs: 5, storm: 0,   shake: 0,   cam: 2, cp: 0.55 },
  // Act 3 — storm arrives fast
  { p: 0.61, mood: 'storm',      bs: 5, storm: 0.8, shake: 0.6, cam: 3, cp: 0.65 },
  { p: 0.68, mood: 'storm',      bs: 5, storm: 1.0, shake: 1.0, cam: 3, cp: 0.80 },
  // Act 4 — storm eases, lights hold
  { p: 0.75, mood: 'built',      bs: 5, storm: 0.4, shake: 0.2, cam: 2, cp: 0.65 },
  { p: 0.83, mood: 'built',      bs: 5, storm: 0,   shake: 0,   cam: 2, cp: 0.50 },
  // Act 5 — bright future
  { p: 0.90, mood: 'prosperous', bs: 5, storm: 0,   shake: 0,   cam: 1, cp: 0.45 },
  { p: 1.00, mood: 'prosperous', bs: 5, storm: 0,   shake: 0,   cam: 1, cp: 0.40 },
]

function lerp(a, b, t) { return a + (b - a) * t }

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function updateScene(p) {
  // Find surrounding keyframes
  let i = 0
  while (i < KF.length - 2 && KF[i + 1].p <= p) i++
  const a = KF[i]
  const b = KF[i + 1]
  const range = b.p - a.p
  const t = range > 0 ? easeInOut(Math.max(0, Math.min(1, (p - a.p) / range))) : 1

  const nextMood = t < 0.5 ? a.mood : b.mood
  const nextBS = Math.round(lerp(a.bs, b.bs, t))
  const nextStorm = Math.max(0, lerp(a.storm, b.storm, t))
  const nextShake = Math.max(0, lerp(a.shake, b.shake, t))
  const nextCam = Math.round(lerp(a.cam, b.cam, t))
  const nextCP = lerp(a.cp, b.cp, t)

  // Only update refs when values actually change — prevents 60fps patch storms
  if (mood.value !== nextMood) mood.value = nextMood
  if (buildStep.value !== nextBS) buildStep.value = nextBS
  // Use epsilon for float comparisons (storm/shake change continuously during storm section)
  if (Math.abs(stormIntensity.value - nextStorm) > 0.005) stormIntensity.value = nextStorm
  if (Math.abs(shake.value - nextShake) > 0.005) shake.value = nextShake
  if (cameraKey.value !== nextCam) cameraKey.value = nextCam
  // cameraProgress feeds only CameraRig (empty template — safe to update)
  cameraProgress.value = nextCP
}

// ── Act boundaries [start, end] in scroll progress ────────────────────────────
const ACT_BOUNDS = [
  [0.00, 0.18],  // Act 1: The Problem
  [0.18, 0.56],  // Act 2: Community (wide — each buildStep gets ~250px)
  [0.56, 0.71],  // Act 3: Typhoon
  [0.71, 0.87],  // Act 4: Resilience
  [0.87, 1.01],  // Act 5: Tomorrow
]

const activeAct = computed(() => {
  const p = scrollProgress.value
  for (let i = 0; i < ACT_BOUNDS.length; i++) {
    if (p >= ACT_BOUNDS[i][0] && p < ACT_BOUNDS[i][1]) return i + 1
  }
  return 5
})

// ── Counter triggers (fire once when entering the act) ────────────────────────
const triggered = ref({})
watch(activeAct, (act) => {
  if ([2, 4, 5].includes(act)) triggered.value = { ...triggered.value, [act]: true }
})

// ── Modal & nav scheme ────────────────────────────────────────────────────────
const showModal = ref(false)
const navScheme = computed(() => activeAct.value === 5 ? 'light' : 'dark')

// ── Jump to act via progress dots ─────────────────────────────────────────────
function jumpToAct(act) {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const [s, e] = ACT_BOUNDS[act - 1]
  window.scrollTo({ top: (s + e) / 2 * scrollable, behavior: 'smooth' })
}

// ── Rain audio (Web Audio API — synthesized white noise) ─────────────────────
let rainCtx = null
let rainGain = null
let rainReady = false

function initRainAudio() {
  if (rainReady) return
  rainReady = true
  try {
    rainCtx = new (window.AudioContext || window.webkitAudioContext)()

    // 3s looped white-noise buffer
    const rate = rainCtx.sampleRate
    const buf = rainCtx.createBuffer(2, rate * 3, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    }

    const src = rainCtx.createBufferSource()
    src.buffer = buf
    src.loop = true

    // band-pass to give that "rain on leaves" texture
    const hpf = rainCtx.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = 280
    hpf.Q.value = 0.4

    const lpf = rainCtx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 1600
    lpf.Q.value = 0.6

    rainGain = rainCtx.createGain()
    rainGain.gain.value = 0

    src.connect(hpf)
    hpf.connect(lpf)
    lpf.connect(rainGain)
    rainGain.connect(rainCtx.destination)
    src.start()
  } catch (e) {
    // AudioContext blocked — gracefully silent
  }
}

function setRainVolume(intensity) {
  if (!rainCtx || !rainGain) return
  if (rainCtx.state === 'suspended') rainCtx.resume()
  const target = Math.max(0, Math.min(1, intensity) * 0.38)
  rainGain.gain.cancelScheduledValues(rainCtx.currentTime)
  rainGain.gain.linearRampToValueAtTime(target, rainCtx.currentTime + 0.9)
}

watch(stormIntensity, (v) => {
  if (v > 0.05) initRainAudio()
  setRainVolume(v)
})

// ── Scroll driver (throttled to ~10fps — avoids Vue patch storms) ──────────────
let lastUpdate = 0
function onScroll() {
  const now = performance.now()
  if (now - lastUpdate < 100) return // throttle: max 10 updates/sec
  lastUpdate = now

  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const p = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
  scrollProgress.value = p
  updateScene(p)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  // Initialize from current scroll position (handles refresh mid-scroll / HMR)
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const initP = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
  updateScene(initP)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (rainCtx) rainCtx.close()
})
</script>

<template>
  <div class="home">
    <!-- Fixed nav & progress dots (already position:fixed in their own components) -->
    <SiteNav :scheme="navScheme" @cta="showModal = true" />
    <ProgressDots :active-act="activeAct" @jump="jumpToAct" />

    <!-- Floating Glowing SVG Sun (visual representation of solar power source) -->
    <div class="svg-sun-container" :class="`mood-${mood}`">
      <svg class="svg-sun" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="sun-gradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFFDF0" />
            <stop offset="30%" stop-color="#FFF176" />
            <stop offset="70%" stop-color="#F97316" />
            <stop offset="100%" stop-color="#EA580C" />
          </radialGradient>
        </defs>
        
        <!-- Rotating solar rays -->
        <g class="sun-rays">
          <circle cx="50" cy="50" r="32" stroke="#FFF7ED" stroke-width="2" stroke-dasharray="4 8" fill="none" opacity="0.3" />
          <circle cx="50" cy="50" r="42" stroke="#FDBA74" stroke-width="1.5" stroke-dasharray="6 12" fill="none" opacity="0.2" />
        </g>
        
        <!-- Inner glow circle -->
        <circle cx="50" cy="50" r="28" fill="#F97316" opacity="0.15" filter="url(#sun-glow)" />
        <!-- Main sun body -->
        <circle cx="50" cy="50" r="22" fill="url(#sun-gradient)" filter="url(#sun-glow)" />
      </svg>
    </div>

    <!-- Fixed 3D scene background -->
    <div class="scene-bg">
      <Scene3D
        :mood="mood"
        :build-step="buildStep"
        :storm-intensity="stormIntensity"
        :shake="shake"
        :camera-key="cameraKey"
        :camera-progress="cameraProgress"
      />
    </div>

    <!-- Fixed UI layer: story panels + storm badge -->
    <div class="ui-layer">
      <!-- Storm signal badge -->
      <Transition name="fade">
        <div v-if="stormIntensity > 0.25" class="storm-badge">
          <span class="storm-dot" />
          <T k="act3.warning" />
        </div>
      </Transition>

      <!-- Story panel (transitions out-in on act change) -->
      <div class="panel-wrap">
        <Transition name="panel" mode="out-in">
          <div
            :key="activeAct"
            class="act-panel"
            :class="activeAct === 5 ? 'light' : 'dark'"
          >
            <!-- ─── ACT 1: The Problem ─── -->
            <template v-if="activeAct === 1">
              <p class="eyebrow panel-eyebrow"><T k="act1.eyebrow" /></p>
              <h1 class="panel-title"><T k="act1.title" /></h1>
              <p class="panel-body"><T k="act1.body" /></p>
              <p class="scroll-hint">
                <T k="act1.cue" />
                <span class="bounce-arrow"> ↓</span>
              </p>
            </template>

            <!-- ─── ACT 2: Community ─── -->
            <template v-else-if="activeAct === 2">
              <p class="eyebrow panel-eyebrow"><T k="act2.eyebrow" /></p>
              <h2 class="panel-title"><T k="act2.title" /></h2>
              <p class="panel-body"><T k="act2.body" /></p>
              <div class="counters">
                <p class="projection-note"><T k="act2.projection" /></p>
                <div v-for="(c, i) in counters.act2" :key="c.key" class="ctr">
                  <span class="ctr-num">
                    <Counter
                      :end="c.value"
                      :suffix="c.suffix || ''"
                      :trigger="!!triggered[2]"
                    />
                  </span>
                  <span class="ctr-lbl"><T :k="`act2.counter${i + 1}.label`" /></span>
                </div>
              </div>
            </template>

            <!-- ─── ACT 3: Typhoon ─── -->
            <template v-else-if="activeAct === 3">
              <p class="eyebrow panel-eyebrow c-red"><T k="act3.eyebrow" /></p>
              <h2 class="panel-title"><T k="act3.title" /></h2>
              <p class="panel-body"><T k="act3.body" /></p>
            </template>

            <!-- ─── ACT 4: Resilience ─── -->
            <template v-else-if="activeAct === 4">
              <p class="eyebrow panel-eyebrow c-green"><T k="act4.eyebrow" /></p>
              <h2 class="panel-title"><T k="act4.title" /></h2>
              <p class="panel-body"><T k="act4.body" /></p>
              <div class="counters">
                <p class="projection-note"><T k="act4.projection" /></p>
                <div v-for="(c, i) in counters.act4" :key="c.key" class="ctr">
                  <span class="ctr-num">
                    <Counter
                      :end="c.value"
                      :decimals="c.decimals || 0"
                      :suffix="c.suffix || ''"
                      :trigger="!!triggered[4]"
                    />
                  </span>
                  <span class="ctr-lbl"><T :k="`act4.counter${i + 1}.label`" /></span>
                </div>
                <!-- Static "0h vs 72h" counter -->
                <div class="ctr">
                  <span class="ctr-num"><T k="act4.counter3.value" /></span>
                  <span class="ctr-lbl"><T k="act4.counter3.label" /></span>
                </div>
              </div>
            </template>

            <!-- ─── ACT 5: Tomorrow ─── -->
            <template v-else-if="activeAct === 5">
              <p class="eyebrow panel-eyebrow c-orange"><T k="act5.eyebrow" /></p>
              <h2 class="panel-title"><T k="act5.title" /></h2>
              <p class="panel-body"><T k="act5.body" /></p>
              <div class="counters">
                <p class="projection-note"><T k="act5.projection" /></p>
                <div v-for="(c, i) in counters.act5" :key="c.key" class="ctr">
                  <span class="ctr-num">
                    <Counter
                      :end="c.value"
                      :prefix="c.prefix || ''"
                      :suffix="c.suffix || ''"
                      :trigger="!!triggered[5]"
                    />
                  </span>
                  <span class="ctr-lbl"><T :k="`act5.counter${i + 1}.label`" /></span>
                </div>
              </div>
              <div class="cta-row">
                <button class="btn-primary" @click="showModal = true">
                  <T k="act5.cta" /> <span aria-hidden>→</span>
                </button>
                <p class="cta-sub"><T k="act5.cta.sub" /></p>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Transparent scroll spacer — makes the document scrollable (600vh total) -->
    <div class="scroll-spacer" aria-hidden="true" />

    <PartnerModal :open="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
/* ── Page layout ─────────────────────────────────────────────────────────────── */
.home {
  position: relative;
}

/* 3D scene pinned behind everything */
.scene-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

/* Transparent spacer that gives the document its 600vh scrollable height */
.scroll-spacer {
  height: 600vh;
  pointer-events: none;
}

/* ── UI overlay (fixed, above scene) ─────────────────────────────────────────── */
.ui-layer {
  position: fixed;
  inset: 0;
  z-index: 10;
  pointer-events: none;       /* pass-through by default */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 60px;
}

/* ── Panel positioning ───────────────────────────────────────────────────────── */
.panel-wrap {
  padding: 0 60px 0 64px;
  max-width: 580px;
  pointer-events: none;
}

/* ── Act panel card ──────────────────────────────────────────────────────────── */
.act-panel {
  pointer-events: all;
  padding: 36px 40px 40px;
  border-radius: 20px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  scrollbar-width: none;
}
.act-panel::-webkit-scrollbar { display: none; }

.act-panel.dark {
  background: rgba(6, 10, 24, 0.35); /* highly transparent */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}
.act-panel.light {
  background: rgba(250, 246, 238, 0.45); /* highly transparent */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(30, 58, 95, 0.18);
  color: var(--color-ink);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

/* ── Panel typography ────────────────────────────────────────────────────────── */
.panel-eyebrow {
  margin: 0 0 12px;
  opacity: 0.65;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.panel-title {
  margin: 0 0 16px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.06;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
}
.panel-body {
  margin: 0;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.58;
}
.act-panel.dark .panel-body { color: rgba(255, 255, 255, 0.72); }
.act-panel.light .panel-body { color: var(--color-ink-soft); }

/* Color accent helpers */
.c-red   { color: #f87171; }
.c-green { color: #4ade80; }
.c-orange { color: var(--color-orange); }

/* ── Scroll hint (Act 1) ─────────────────────────────────────────────────────── */
.scroll-hint {
  margin: 20px 0 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.5;
}
.bounce-arrow {
  display: inline-block;
  animation: bounce 1.6s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}

/* ── Counters ─────────────────────────────────────────────────────────────────── */
.projection-note {
  grid-column: 1 / -1;
  margin: 0 0 2px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.4;
  color: var(--color-orange);
}
.act-panel.light .projection-note { color: var(--color-blue); }
.counters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 20px;
  margin-top: 22px;
}
.ctr {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ctr-num {
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-orange);
}
.act-panel.light .ctr-num { color: var(--color-blue); }
.ctr-lbl {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  opacity: 0.55;
}

/* ── CTA row (Act 5) ─────────────────────────────────────────────────────────── */
.cta-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 26px;
  flex-wrap: wrap;
}
.cta-sub {
  margin: 0;
  font-size: 13px;
  opacity: 0.55;
}

/* ── Storm signal badge ──────────────────────────────────────────────────────── */
.storm-badge {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(178, 37, 53, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  padding: 8px 22px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
  pointer-events: none;
}
.storm-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  flex-shrink: 0;
  animation: pulse 1s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.75); }
}

/* ── Transitions ─────────────────────────────────────────────────────────────── */
.panel-enter-active {
  transition: opacity 0.42s ease, transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}
.panel-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateY(22px);
}
.panel-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from,
.fade-leave-to      { opacity: 0; }

/* ── Floating SVG Sun Styles ─────────────────────────────────────────────────── */
.svg-sun-container {
  position: fixed;
  top: 90px;
  right: 40px;
  width: 90px;
  height: 90px;
  z-index: 100;
  pointer-events: none;
  transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0;
  transform: scale(0.6) rotate(0deg);
}
.svg-sun {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.45));
}
.sun-rays {
  transform-origin: center;
  animation: rotate-rays 40s linear infinite;
}
@keyframes rotate-rays {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Opacity and scale adjustments based on active scene mood */
.svg-sun-container.mood-dark {
  opacity: 0;
  transform: scale(0.5) rotate(-30deg);
}
.svg-sun-container.mood-poverty {
  opacity: 0.8;
  transform: scale(0.9) rotate(15deg);
}
.svg-sun-container.mood-awakening,
.svg-sun-container.mood-prosperous {
  opacity: 1;
  transform: scale(1.1) rotate(45deg);
  animation: pulse-sun 4s ease-in-out infinite alternate;
}
.svg-sun-container.mood-storm {
  opacity: 0.05;
  transform: scale(0.7) translateY(-20px) rotate(-10deg);
}
.svg-sun-container.mood-built {
  opacity: 0.55;
  transform: scale(0.9) rotate(20deg);
}

@keyframes pulse-sun {
  0% {
    filter: drop-shadow(0 0 15px rgba(253, 186, 116, 0.4));
    transform: scale(1.05);
  }
  100% {
    filter: drop-shadow(0 0 35px rgba(249, 115, 22, 0.8));
    transform: scale(1.15);
  }
}

/* ── Responsive ──────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .panel-wrap {
    padding: 0 20px;
    max-width: 100%;
  }
  .act-panel {
    padding: 28px 24px 32px;
  }
  .ui-layer {
    padding-bottom: 36px;
  }
  .counters {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
