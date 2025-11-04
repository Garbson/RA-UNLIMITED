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

    <!-- About Us Section -->
    <v-container id="about-section" class="py-16">
      <v-row class="d-flex justify-center">
        <v-col cols="12" lg="10" xl="8">
          <div class="text-center mb-10">
            <h2 class="display-1 font-weight-bold mb-6 gradient-title">About Us</h2>
          </div>

          <v-card class="about-us-card pa-8 elevation-4" style="border-radius: 20px">
            <div class="about-text">
              <p class="text-h6 mb-6 text-center font-weight-light leading-relaxed">
                We're not trying to recreate the wheel. We're not trying to recreate the world.
                We're trying to create normalcy in places where normal hasn't had a chance.
              </p>

              <p class="text-body-1 mb-4 leading-relaxed">
                What is "normal". Normal is dinner with family. Dancing with family. Karaoke and hanging out with family.
                We're not building cities, or villages. We're building places for families to have the opportunities
                that are the foundation of family.
              </p>

              <p class="text-body-1 mb-4 leading-relaxed">
                Without family. Things tend to crumble. Without hope, things start to burn. Ra Unlimited doesn't hope
                for a better future in the Philippines. Ra Unlimited knows a way to help everyone progress and find
                their way back home.
              </p>

              <p class="text-body-1 mb-6 leading-relaxed">
                Home is in the countryside, beside a warm fire, laughing with friends, and not worrying about anything.
              </p>

              <div class="text-center">
                <p class="text-h5 font-weight-bold gradient-text-orange">
                  Ra Unlimited is here to help you find your way home.
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main About Section with all content -->
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

/* About Us Section Styles */
.gradient-title {
  background: linear-gradient(135deg, #ff7700, #ffa500, #dcdada);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gradient-text-orange {
  background: linear-gradient(135deg, #ff7700, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.about-us-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.1);
  transition: all 0.3s ease;
}

.about-us-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(255, 165, 0, 0.1);
}

.about-text p {
  line-height: 1.7;
  color: #2c3e50;
}

.leading-relaxed {
  line-height: 1.8;
}

/* Mobile responsive for hero text */
@media (max-width: 768px) {
  .ReacheForTheSun {
    line-height: 1.2;
  }

  .gradient-text {
    font-size: 1.8rem !important;
  }

  .about-us-card {
    padding: 16px !important;
  }

  .display-1 {
    font-size: 1.8rem !important;
  }

  .text-h6 {
    font-size: 1.2rem !important;
  }

  .text-h5 {
    font-size: 1.1rem !important;
  }
}

/* CTA Sections Styles */
.cta-quote-card {
  background: linear-gradient(135deg, #fff7e6 0%, #ffffff 100%);
  border: 2px solid rgba(255, 165, 0, 0.2);
  transition: all 0.3s ease;
}

.cta-quote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.2);
}

.cta-service-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.cta-solution-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(30, 144, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-solution-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(30, 144, 255, 0.15);
}

.service-cta-header {
  background: linear-gradient(135deg, #ff7700 0%, #ffa500 100%);
}

.solution-cta-header {
  background: linear-gradient(135deg, #1e90ff 0%, #4682b4 100%);
}

.benefits-list .v-chip {
  transition: all 0.3s ease;
}

.benefits-list .v-chip:hover {
  transform: scale(1.05);
}

/* Mobile responsive for CTA sections */
@media (max-width: 768px) {
  .cta-quote-card {
    padding: 16px !important;
  }

  .text-h3 {
    font-size: 1.5rem !important;
  }

  .text-h6 {
    font-size: 1.1rem !important;
  }

  .service-cta-header,
  .solution-cta-header {
    padding: 16px !important;
  }

  .cta-service-card,
  .cta-solution-card {
    height: auto !important;
    min-height: 350px;
  }
}
</style>
