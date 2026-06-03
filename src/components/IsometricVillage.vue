<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 0 .. 5: progress through the village build (Act 2)
  buildStep: { type: Number, default: 0 },
  // dark | built | storm | dawn | day
  mood: { type: String, default: 'dark' },
  // 0..1 storm intensity (Act 3)
  stormIntensity: { type: Number, default: 0 },
  // 0..1 shake intensity
  shake: { type: Number, default: 0 },
})

// Visibility helpers
const show = (n) => props.buildStep >= n
const lit = computed(() => ['built', 'dawn', 'day'].includes(props.mood))
const stormy = computed(() => props.mood === 'storm')
const isDark = computed(() => props.mood === 'dark')

const skyGradient = computed(() => {
  switch (props.mood) {
    case 'dark':
      return ['#0a1228', '#1a2240']
    case 'storm':
      return ['#1a0f1a', '#3a2030']
    case 'dawn':
      return ['#ffb766', '#fde047']
    case 'day':
      return ['#fae9c8', '#fcd9a0']
    case 'built':
    default:
      return ['#0f1f33', '#2a3a55']
  }
})

const moonOpacity = computed(() => (isDark.value ? 0.9 : props.mood === 'built' ? 0.55 : 0))
const sunY = computed(() => {
  if (props.mood === 'dawn') return 120
  if (props.mood === 'day') return 80
  return 200
})
const sunOpacity = computed(() => (props.mood === 'dawn' || props.mood === 'day' ? 1 : 0))

const shakeStyle = computed(() => {
  if (!props.shake) return null
  const amp = props.shake * 4
  return { '--shake-amp': `${amp}px` }
})
</script>

<template>
  <svg
    viewBox="0 0 800 500"
    class="village"
    :class="['mood-' + mood, { shaking: shake > 0 }]"
    :style="shakeStyle"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="skyGradient[0]" />
        <stop offset="100%" :stop-color="skyGradient[1]" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFE4B0" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#F97316" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#E0E8FF" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#E0E8FF" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2E4A2C" />
        <stop offset="100%" stop-color="#1B2D1A" />
      </linearGradient>
      <linearGradient id="groundLit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6B8B43" />
        <stop offset="100%" stop-color="#3F5F2A" />
      </linearGradient>

      <!-- Window light gradient -->
      <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFE4A0" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#FFE4A0" stop-opacity="0" />
      </radialGradient>

      <!-- Solar panel gradient -->
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1E3A5F" />
        <stop offset="100%" stop-color="#0F1F33" />
      </linearGradient>
      <linearGradient id="panelLit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3B5A85" />
        <stop offset="100%" stop-color="#1E3A5F" />
      </linearGradient>
    </defs>

    <!-- SKY -->
    <rect x="0" y="0" width="800" height="500" fill="url(#sky)" />

    <!-- Stars (only in dark moods) -->
    <g class="stars" :opacity="isDark ? 0.8 : 0">
      <circle cx="80" cy="50" r="0.8" fill="#fff" />
      <circle cx="180" cy="90" r="1" fill="#fff" />
      <circle cx="320" cy="40" r="0.8" fill="#fff" />
      <circle cx="450" cy="70" r="0.6" fill="#fff" />
      <circle cx="560" cy="50" r="1" fill="#fff" />
      <circle cx="680" cy="100" r="0.8" fill="#fff" />
      <circle cx="720" cy="30" r="0.6" fill="#fff" />
      <circle cx="240" cy="160" r="0.5" fill="#fff" />
      <circle cx="500" cy="180" r="0.5" fill="#fff" />
    </g>

    <!-- Moon -->
    <g class="moon" :opacity="moonOpacity">
      <circle cx="660" cy="100" r="48" fill="url(#moonGlow)" />
      <circle cx="660" cy="100" r="22" fill="#E8EEFF" />
      <circle cx="668" cy="92" r="4" fill="#C9D2EC" opacity="0.6" />
      <circle cx="652" cy="108" r="3" fill="#C9D2EC" opacity="0.4" />
    </g>

    <!-- Sun (dawn/day) -->
    <g class="sun" :opacity="sunOpacity">
      <circle :cx="140" :cy="sunY" r="90" fill="url(#sunGlow)" />
      <circle :cx="140" :cy="sunY" r="36" fill="#F97316" />
      <circle :cx="140" :cy="sunY" r="28" fill="#EAB308" />
    </g>

    <!-- Distant mountains -->
    <path
      d="M0,310 L100,250 L200,290 L320,220 L440,280 L580,230 L720,290 L800,260 L800,350 L0,350 Z"
      fill="#0a1228"
      :opacity="lit ? 0.35 : 0.65"
    />
    <path
      d="M0,340 L160,290 L280,330 L420,270 L560,320 L720,290 L800,320 L800,360 L0,360 Z"
      fill="#0a1228"
      :opacity="lit ? 0.45 : 0.8"
    />

    <!-- GROUND -->
    <g class="ground">
      <rect x="0" y="340" width="800" height="160" :fill="lit ? 'url(#groundLit)' : 'url(#ground)'" />
      <!-- Isometric ground texture lines -->
      <g stroke="rgba(255,255,255,0.04)" stroke-width="1" v-show="lit">
        <line x1="0" y1="380" x2="800" y2="380" />
        <line x1="0" y1="420" x2="800" y2="420" />
        <line x1="0" y1="460" x2="800" y2="460" />
      </g>
    </g>

    <!-- VILLAGE GROUP -->
    <g class="village-group">
      <!-- TREES -->
      <g class="trees" v-show="show(1)">
        <g transform="translate(60,310)">
          <ellipse cx="0" cy="0" rx="18" ry="22" :fill="lit ? '#4A6B30' : '#1F3318'" />
          <rect x="-3" y="20" width="6" height="14" fill="#3a2818" />
        </g>
        <g transform="translate(740,320)">
          <ellipse cx="0" cy="0" rx="20" ry="24" :fill="lit ? '#4A6B30' : '#1F3318'" />
          <rect x="-3" y="22" width="6" height="14" fill="#3a2818" />
        </g>
      </g>

      <!-- House 1 (small) -->
      <g class="house" v-show="show(1)" transform="translate(160, 260)">
        <!-- side -->
        <polygon points="0,30 30,40 30,90 0,80" :fill="lit ? '#C49A6C' : '#3D2D1A'" />
        <!-- front -->
        <polygon points="30,40 80,30 80,80 30,90" :fill="lit ? '#D8AE7C' : '#4D3823'" />
        <!-- roof -->
        <polygon points="0,30 40,10 90,20 80,30 30,40" :fill="lit ? '#8B3A1F' : '#2A1810'" />
        <polygon points="30,40 80,30 90,20 40,10" :fill="lit ? '#A14826' : '#33201A'" opacity="0.85" />
        <!-- Window -->
        <rect x="48" y="50" width="14" height="14" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <circle v-if="lit" cx="55" cy="57" r="14" fill="url(#windowGlow)" opacity="0.7" />
        <!-- Solar panel -->
        <g v-show="show(2)" transform="translate(35, 8) skewX(-12)">
          <rect x="0" y="0" width="40" height="14" :fill="lit ? 'url(#panelLit)' : 'url(#panel)'" />
          <line v-for="n in 3" :key="n" :x1="n * 10" y1="0" :x2="n * 10" y2="14" stroke="#0F1F33" stroke-width="0.5" />
        </g>
      </g>

      <!-- House 2 -->
      <g class="house" v-show="show(1)" transform="translate(280, 240)">
        <polygon points="0,40 35,52 35,110 0,98" :fill="lit ? '#B8884F' : '#33240F'" />
        <polygon points="35,52 95,40 95,98 35,110" :fill="lit ? '#CFA169' : '#402F18'" />
        <polygon points="0,40 50,15 100,25 95,40 35,52" :fill="lit ? '#7B3318' : '#2A1810'" />
        <polygon points="35,52 95,40 100,25 50,15" :fill="lit ? '#923F1F' : '#33201A'" opacity="0.85" />
        <rect x="14" y="60" width="14" height="18" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <rect x="56" y="62" width="18" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <g v-show="show(2)" transform="translate(40, 12) skewX(-12)">
          <rect x="0" y="0" width="50" height="18" :fill="lit ? 'url(#panelLit)' : 'url(#panel)'" />
          <line v-for="n in 4" :key="n" :x1="n * 12" y1="0" :x2="n * 12" y2="18" stroke="#0F1F33" stroke-width="0.5" />
        </g>
      </g>

      <!-- SCHOOL (Step 3) -->
      <g class="school" v-show="show(3)" transform="translate(420, 220)">
        <polygon points="0,40 50,55 50,120 0,108" :fill="lit ? '#E5D5B0' : '#33291A'" />
        <polygon points="50,55 130,40 130,108 50,120" :fill="lit ? '#F0DFBE' : '#403220'" />
        <polygon points="0,40 65,12 145,25 130,40 50,55" :fill="lit ? '#5B7C99' : '#1A2638'" />
        <polygon points="50,55 130,40 145,25 65,12" :fill="lit ? '#6B8FAB' : '#222F44'" opacity="0.85" />
        <!-- 3 big windows -->
        <rect x="14" y="65" width="14" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <rect x="60" y="70" width="14" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <rect x="84" y="70" width="14" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <rect x="108" y="70" width="14" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
        <!-- Flag -->
        <rect x="62" y="-5" width="2" height="20" :fill="lit ? '#3a2818' : '#1a1208'" />
        <polygon points="64,-5 78,0 64,5" :fill="lit ? '#F97316' : '#3a1810'" />
        <!-- Panel -->
        <g v-show="show(2)" transform="translate(55, 8) skewX(-12)">
          <rect x="0" y="0" width="80" height="22" :fill="lit ? 'url(#panelLit)' : 'url(#panel)'" />
          <line v-for="n in 7" :key="n" :x1="n * 10" y1="0" :x2="n * 10" y2="22" stroke="#0F1F33" stroke-width="0.5" />
        </g>
      </g>

      <!-- MARKET (Step 4) -->
      <g class="market" v-show="show(4)" transform="translate(580, 250)">
        <polygon points="0,40 40,50 40,98 0,88" :fill="lit ? '#B8884F' : '#3a2810'" />
        <polygon points="40,50 100,40 100,90 40,98" :fill="lit ? '#CFA169' : '#4a3520'" />
        <!-- Striped awning -->
        <polygon points="-8,30 50,16 110,28 100,40 40,50 0,40" :fill="lit ? '#F97316' : '#3a1810'" />
        <polygon points="-8,30 50,16 110,28" :fill="lit ? '#EAB308' : '#2a2010'" opacity="0.6" />
        <line x1="20" y1="22" x2="14" y2="42" :stroke="lit ? '#fff' : '#000'" stroke-width="0.5" opacity="0.5" />
        <line x1="50" y1="16" x2="50" y2="50" :stroke="lit ? '#fff' : '#000'" stroke-width="0.5" opacity="0.5" />
        <line x1="80" y1="22" x2="85" y2="48" :stroke="lit ? '#fff' : '#000'" stroke-width="0.5" opacity="0.5" />
        <!-- Lights inside -->
        <rect x="50" y="62" width="40" height="20" :fill="lit ? '#FFE4A0' : '#0E1A22'" />
      </g>

      <!-- WATER TOWER (Step 5) -->
      <g class="tower" v-show="show(5)" transform="translate(710, 200)">
        <!-- legs -->
        <line x1="0" y1="60" x2="6" y2="140" :stroke="lit ? '#888' : '#333'" stroke-width="3" />
        <line x1="40" y1="60" x2="34" y2="140" :stroke="lit ? '#888' : '#333'" stroke-width="3" />
        <!-- tank -->
        <ellipse cx="20" cy="40" rx="28" ry="12" :fill="lit ? '#A8D0E0' : '#1a2a35'" />
        <rect x="-8" y="40" width="56" height="30" :fill="lit ? '#8AB8CC' : '#15252e'" />
        <ellipse cx="20" cy="70" rx="28" ry="10" :fill="lit ? '#6A98AC' : '#0e1a22'" />
        <!-- text strip -->
        <text x="0" y="58" font-size="6" font-family="Inter, sans-serif" font-weight="700" :fill="lit ? '#1E3A5F' : '#1a2a35'" v-show="lit">RA</text>
      </g>
    </g>

    <!-- STORM OVERLAY -->
    <g class="storm" :opacity="stormIntensity">
      <!-- Lightning crack -->
      <path
        d="M 380 0 L 360 80 L 380 90 L 350 200 L 380 210"
        stroke="#FFEED0"
        stroke-width="2"
        fill="none"
        opacity="0.0"
        class="lightning"
      />
      <!-- Red signal overlay -->
      <rect x="0" y="0" width="800" height="500" fill="#b22535" opacity="0.06" />
    </g>
  </svg>
</template>

<style scoped>
.village {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  display: block;
}
.house, .school, .market, .tower, .trees {
  transition: opacity 0.6s ease;
}
.stars, .moon, .sun {
  transition: opacity 0.8s ease;
}
.ground rect { transition: fill 0.8s ease; }
@keyframes shakeAnim {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(calc(var(--shake-amp) * -1), 0); }
  50% { transform: translate(0, var(--shake-amp)); }
  75% { transform: translate(var(--shake-amp), 0); }
}
.village.shaking .village-group {
  animation: shakeAnim 0.18s infinite;
  transform-origin: center;
}

/* lightning flicker (only when storm active) */
.mood-storm .lightning {
  animation: flash 4s ease-in-out infinite;
}
@keyframes flash {
  0%, 92%, 100% { opacity: 0; }
  93%, 95% { opacity: 0.9; }
  94% { opacity: 0.2; }
}
</style>
