<template>
  <v-card class="w-100">
    <v-carousel
      cycle="true"
      :hide-delimiters="true"
      :show-arrows="false"
      :hide-delimiter-background="true"
      height="800"
    >
      <v-carousel-item
        v-for="(item, i) in 6"
        :key="i"
        :src="carouselImg[i]"
        cover
        gradient="to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)"
      >
        <div class="h-100 d-flex align-center justify-center text-center">
          <h1 class="ReacheForTheSun gradient-text text-h2 text-white">Reach for the Sun</h1>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script setup>
const carouselImg = [
  '/img/filipinas01.jpg',
  '/img/filipinas02.jpg',
  '/img/filipinas03.jpg',
  '/img/filipinas04.jpg',
  '/img/filipinas05.jpg',
  '/img/filipinas06.jpg',

]
</script>
<style scoped>
.ReacheForTheSun {
  font-family: 'Arimo', sans-serif;
}

.gradient-text {
  background: linear-gradient(90deg, #edebeb, #ff7700);
  -webkit-background-clip: text; /* Safari/Chrome */
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
