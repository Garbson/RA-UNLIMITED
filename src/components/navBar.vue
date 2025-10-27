<template>
  <v-app-bar eager scroll-behavior="hide" class="bg-white-orange" :elevation="0">
    <v-avatar size="40" class="ml-15" rounded="lg" image="src/assets/img/logoRa.jpeg" />
    <v-app-bar-title class="Name gradient-text">
      <div class="ReacheForTheSun gradient-text text-h5">RA UNLIMITED</div>
    </v-app-bar-title>
    <v-spacer />
    <v-btn class="text-white" btnActions text> About Us </v-btn>
    <v-btn class="text-white" btnActions text> Services </v-btn>
    <v-btn class="text-white" btnActions text> Contact </v-btn>
  </v-app-bar>
</template>
<script setup></script>
<style scoped>
.bg-white-orange {
  background: linear-gradient(90deg, #161515 0%, #ffa500 100%);
}
.Name {
  font-family: 'Arimo', sans-serif;
}
.gradient-text {
  background: linear-gradient(90deg, #edebeb, #ff7700);
  -webkit-background-clip: text; /* Safari/Chrome */
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent !important;
  display: inline-block;
}

.btnActions {
  font-family: 'Arimo', sans-serif;
  font-weight: 600;
}
</style>
