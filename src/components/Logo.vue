<script setup>
defineProps({
  size: { type: [Number, String], default: 36 },
  monochrome: { type: Boolean, default: false },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="ra-logo"
    :class="{ 'is-mono': monochrome }"
    aria-label="Ra Unlimited"
  >
    <!-- Outer rays -->
    <g class="rays" :stroke="monochrome ? 'currentColor' : '#EAB308'" stroke-width="2" stroke-linecap="round">
      <line x1="32" y1="6" x2="32" y2="12" />
      <line x1="32" y1="52" x2="32" y2="58" />
      <line x1="6" y1="32" x2="12" y2="32" />
      <line x1="52" y1="32" x2="58" y2="32" />
      <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" />
      <line x1="46.5" y1="46.5" x2="50.5" y2="50.5" />
      <line x1="13.5" y1="50.5" x2="17.5" y2="46.5" />
      <line x1="46.5" y1="17.5" x2="50.5" y2="13.5" />
    </g>
    <!-- Sun disc -->
    <circle
      cx="32"
      cy="32"
      r="14"
      :fill="monochrome ? 'currentColor' : '#F97316'"
    />
    <!-- Dynamic streak across the sun -->
    <path
      d="M14 38 Q26 28 32 34 T50 30"
      :stroke="monochrome ? 'rgba(255,255,255,0.85)' : '#1E3A5F'"
      stroke-width="3"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M16 41 Q26 33 34 36 T48 33"
      :stroke="monochrome ? 'rgba(255,255,255,0.4)' : '#EAB308'"
      stroke-width="2"
      stroke-linecap="round"
      fill="none"
      opacity="0.85"
    />
  </svg>
</template>

<style scoped>
.ra-logo { display: block; }
.is-mono { color: currentColor; }
</style>
