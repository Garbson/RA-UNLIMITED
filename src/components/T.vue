<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const props = defineProps({
  k: { type: String, required: true },
  tag: { type: String, default: 'span' },
  fallback: { type: String, default: '' },
})

const { t } = useI18n()
const text = computed(() => t(props.k, props.fallback))
const lines = computed(() => text.value.split('\n'))
</script>

<template>
  <component :is="tag" class="t">
    <template v-for="(line, i) in lines" :key="i">
      {{ line }}<br v-if="i < lines.length - 1" />
    </template>
  </component>
</template>
