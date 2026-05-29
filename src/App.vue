<script setup>
import { onMounted, computed, watchEffect } from 'vue'
import NavBar from './components/navBar.vue'
import AdminBar from './components/AdminBar.vue'
import { useAuth } from './composables/useAuth.js'
import { useContent } from './composables/useContent.js'
import { useRoute } from 'vue-router'

const { bootstrap: bootstrapAuth, isAuthenticated } = useAuth()
const { bootstrap: bootstrapContent } = useContent()
const route = useRoute()

const hideChrome = computed(() => route.meta?.bare === true)

onMounted(async () => {
  await Promise.all([bootstrapAuth(), bootstrapContent()])
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('is-editor-mode', isAuthenticated.value)
})
</script>

<template>
  <v-app>
    <NavBar v-if="!hideChrome" />
    <v-main>
      <router-view />
    </v-main>
    <AdminBar v-if="!hideChrome" />
  </v-app>
</template>
