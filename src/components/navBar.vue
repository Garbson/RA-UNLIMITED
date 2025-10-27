<template>
  <v-app-bar eager scroll-behavior="hide" class="bg-white-orange" :elevation="0">
    <v-avatar size="40" class="ml-15" rounded="lg" image="src/assets/img/logoRa.jpeg" @click="scrollToHome" style="cursor: pointer;" />
    <v-app-bar-title class="Name gradient-text" @click="scrollToHome" style="cursor: pointer;">
      <div class="ReacheForTheSun gradient-text text-h5">RA UNLIMITED</div>
    </v-app-bar-title>
    <v-spacer />
    <v-btn class="text-white btnActions" text @click="scrollToHome">Home</v-btn>
    <v-btn class="text-white btnActions" text @click="scrollToAbout">About Us</v-btn>
    <v-btn class="text-white btnActions" text @click="scrollToContact">Contact</v-btn>
  </v-app-bar>
</template>
<script setup>
const scrollToHome = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about-section')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContact = () => {
  const footer = document.querySelector('.footer-section')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
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
</style>
