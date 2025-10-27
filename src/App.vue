<script setup>
import NavBar from './components/navBar.vue';
import HomeView from './views/HomeView.vue';
import AboutView from './views/aboutView.vue';
</script>

<template>
  <v-app>
    <NavBar />
    <v-main>
      <HomeView />
      <AboutView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
