<template>
  <v-app-bar eager scroll-behavior="hide" class="bg-white-orange" :elevation="0">
    <v-avatar
      size="40"
      :class="$vuetify.display.mobile ? 'ml-4' : 'ml-15'"
      rounded="lg"
      image="img/logoRa.jpeg"
      @click="navigateToHome"
      style="cursor: pointer"
    />
    <v-app-bar-title class="Name gradient-text" @click="navigateToHome" style="cursor: pointer">
      <div class="ReacheForTheSun gradient-text" :class="$vuetify.display.mobile ? 'text-h6' : 'text-h5'">
        RA UNLIMITED
      </div>
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Menu -->
    <div v-if="!$vuetify.display.mobile" class="d-flex">
      <router-link to="/" class="text-decoration-none">
        <v-btn class="text-white btnActions" text>Home</v-btn>
      </router-link>
      <router-link to="/services" class="text-decoration-none">
        <v-btn class="text-white btnActions" text>Services</v-btn>
      </router-link>
      <router-link to="/solar-solutions" class="text-decoration-none">
        <v-btn class="text-white btnActions" text>Solutions</v-btn>
      </router-link>
      <router-link to="/quote" class="text-decoration-none">
        <v-btn class="text-white btnActions" text>Quote</v-btn>
      </router-link>
      <v-btn class="text-white btnActions" text @click="scrollToContact">Contact</v-btn>
    </div>

    <!-- Mobile Menu Button -->
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mobile"
      @click="drawer = !drawer"
      color="white"
      class="mr-2"
    ></v-app-bar-nav-icon>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" location="right" temporary class="mobile-drawer">
    <v-list>
      <v-list-item prepend-icon="mdi-close" @click="drawer = false" class="close-button">
        <v-list-item-title>Close Menu</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <router-link to="/" class="text-decoration-none" @click="drawer = false">
        <v-list-item prepend-icon="mdi-home" class="mobile-nav-item">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/services" class="text-decoration-none" @click="drawer = false">
        <v-list-item prepend-icon="mdi-wrench" class="mobile-nav-item">
          <v-list-item-title>Our Services</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/solar-solutions" class="text-decoration-none" @click="drawer = false">
        <v-list-item prepend-icon="mdi-solar-panel-large" class="mobile-nav-item">
          <v-list-item-title>Solar Solutions</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/quote" class="text-decoration-none" @click="drawer = false">
        <v-list-item prepend-icon="mdi-calculator" class="mobile-nav-item">
          <v-list-item-title>Get a Quote</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/support" class="text-decoration-none" @click="drawer = false">
        <v-list-item prepend-icon="mdi-help-circle" class="mobile-nav-item">
          <v-list-item-title>Support</v-list-item-title>
        </v-list-item>
      </router-link>


      <v-list-item prepend-icon="mdi-phone" @click="scrollToContact" class="mobile-nav-item">
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

const navigateToHome = () => {
  router.push('/')
}

const scrollToContact = () => {
  const footer = document.querySelector('.footer-section')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
  drawer.value = false
}
</script>
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
  transition: all 0.3s ease;
}

.btnActions:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.text-decoration-none {
  text-decoration: none;
}

/* Active route styling */
.router-link-active .btnActions {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: 700;
}

/* Mobile drawer styling */
.mobile-drawer {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.close-button {
  background-color: rgba(255, 165, 0, 0.1);
  margin-bottom: 8px;
}

.mobile-nav-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
}

.mobile-nav-item:hover {
  background-color: rgba(255, 165, 0, 0.1);
  transform: translateX(5px);
}

.router-link-exact-active .mobile-nav-item {
  background-color: rgba(255, 165, 0, 0.2);
  font-weight: 600;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .v-app-bar-title {
    font-size: 1.1rem !important;
  }

  .ReacheForTheSun {
    font-size: 1rem !important;
  }
}
</style>
