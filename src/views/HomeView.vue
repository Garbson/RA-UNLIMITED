<template>
  <div>
    <!-- Hero Section -->
    <v-card class="w-100">
      <v-carousel
        cycle="true"
        :hide-delimiters="true"
        :show-arrows="false"
        :hide-delimiter-background="true"
        :height="$vuetify.display.mobile ? '600' : '800'"
      >
        <v-carousel-item
          v-for="(item, i) in carouselImg"
          :key="i"
          :src="item.src"
          cover
          gradient="to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)"
        >
          <div class="h-100 d-flex align-center justify-center text-center">
            <h2 class="ReacheForTheSun gradient-text text-white"
                :class="$vuetify.display.mobile ? 'text-h4 pa-6' : 'text-h2 pa-10'">
              {{ item.text }}
            </h2>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>

    <!-- About Section -->
    <AboutView />
  </div>
</template>
<script setup>
import AboutView from './aboutView.vue';

const carouselImg = [
  { src: '/img/sun.jpg', text: 'Reach for the Sun' },
  { src: '/img/filipinas02.jpg', text: 'creating sustainable energy' },
  { src: '/img/filipinas03.jpg', text: 'lift people out of poverty' },
  { src: '/img/filipinas04.jpg', text: 'Energy for All Communities' },
  { src: '/img/placaSolar.jpg', text: 'Empowering Communities, One Solar Panel at a Time' },
  { src: '/img/filipinas06.jpg', text: "Building Tomorrow's Energy Today" },
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

/* Mobile responsive for hero text */
@media (max-width: 768px) {
  .ReacheForTheSun {
    line-height: 1.2;
  }

  .gradient-text {
    font-size: 1.8rem !important;
  }
}
</style>
