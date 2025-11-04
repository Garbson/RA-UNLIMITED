<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Our Services</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        Complete solar energy solutions for homes, businesses, and communities across the Philippines
      </p>
    </div>

    <v-row class="d-flex justify-center" spacing="6">
      <v-col cols="12" md="4" class="mb-6">
        <v-card height="400px" class="service-card elevation-8 card-hover" style="border-radius: 20px">
          <div class="service-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-home-lightning-bolt</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold">
              Residential Solar
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <p class="text-body-2 mb-3">
              Complete solar solutions for Filipino homes including:
            </p>
            <ul class="service-list">
              <li>Solar panel installation</li>
              <li>Battery storage systems</li>
              <li>Grid-tie inverters</li>
              <li>24/7 monitoring</li>
              <li>Maintenance & support</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card height="400px" class="service-card elevation-8 card-hover" style="border-radius: 20px">
          <div class="service-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-office-building</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold">
              Commercial Solar
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <p class="text-body-2 mb-3">
              Large-scale solar installations for businesses:
            </p>
            <ul class="service-list">
              <li>Custom system design</li>
              <li>Industrial-grade equipment</li>
              <li>Energy management systems</li>
              <li>ROI analysis & financing</li>
              <li>Professional installation</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card height="400px" class="service-card elevation-8 card-hover" style="border-radius: 20px">
          <div class="service-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-city</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold">
              Community Projects
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <p class="text-body-2 mb-3">
              Empowering entire communities with clean energy:
            </p>
            <ul class="service-list">
              <li>Rural electrification</li>
              <li>School & clinic solar</li>
              <li>Water pumping systems</li>
              <li>Street lighting</li>
              <li>Community training</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.gradient-title {
  background: linear-gradient(135deg, #ff7700, #ffa500, #dcdada);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.service-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.2);
  transition: all 0.4s ease;
}

.service-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.15);
}

.service-header {
  background: linear-gradient(135deg, #ff7700 0%, #ffa500 100%);
}

.card-hover {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.service-list {
  list-style: none;
  padding: 0;
}

.service-list li {
  padding: 4px 0;
  position: relative;
  padding-left: 20px;
}

.service-list li::before {
  content: "⚡";
  position: absolute;
  left: 0;
  color: #ff7700;
}
</style>