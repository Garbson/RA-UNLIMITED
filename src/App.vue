<script setup>
import NavBar from './components/navBar.vue';
</script>

<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
