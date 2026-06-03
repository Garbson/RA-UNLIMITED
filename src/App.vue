<script setup>
import { computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AdminBar from './components/AdminBar.vue'
import { useAuth } from './composables/useAuth.js'
import { useContent } from './composables/useContent.js'
import { useI18n } from './composables/useI18n.js'

const { bootstrap: bootstrapAuth, isAuthenticated } = useAuth()
const { bootstrap: bootstrapContent } = useContent()
const { bootstrap: bootstrapI18n } = useI18n()
const route = useRoute()

const hideAdminBar = computed(() => route.name === 'login' || route.name === 'quotes')

onMounted(async () => {
  bootstrapI18n()
  await Promise.all([bootstrapAuth(), bootstrapContent()])
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('is-editor-mode', isAuthenticated.value)
})
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <AdminBar v-if="!hideAdminBar" />
  </v-app>
</template>
