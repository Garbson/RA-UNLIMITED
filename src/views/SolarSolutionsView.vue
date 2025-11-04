<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Solar Solutions</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 700px">
        Advanced solar technology designed for the unique needs of the Philippine archipelago
      </p>
    </div>

    <v-row class="mb-12">
      <v-col cols="12" md="6" class="mb-6">
        <v-card class="solution-card elevation-6" style="border-radius: 16px; height: 350px">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="50" color="orange" class="mr-4">mdi-solar-panel-large</v-icon>
              <h3 class="text-h5 font-weight-bold">High-Efficiency Panels</h3>
            </div>
            <p class="text-body-2 mb-4">
              Our premium monocrystalline solar panels are specifically selected for tropical climates,
              delivering maximum power output even in high humidity conditions.
            </p>
            <div class="specs">
              <v-chip class="mr-2 mb-2" color="green" small>25-year warranty</v-chip>
              <v-chip class="mr-2 mb-2" color="blue" small>21% efficiency</v-chip>
              <v-chip class="mr-2 mb-2" color="orange" small>Typhoon-resistant</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="mb-6">
        <v-card class="solution-card elevation-6" style="border-radius: 16px; height: 350px">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="50" color="blue" class="mr-4">mdi-battery-high</v-icon>
              <h3 class="text-h5 font-weight-bold">Smart Battery Storage</h3>
            </div>
            <p class="text-body-2 mb-4">
              Lithium-ion battery systems with intelligent energy management, ensuring power
              availability during outages and optimizing energy usage throughout the day.
            </p>
            <div class="specs">
              <v-chip class="mr-2 mb-2" color="purple" small>10-year warranty</v-chip>
              <v-chip class="mr-2 mb-2" color="green" small>6000+ cycles</v-chip>
              <v-chip class="mr-2 mb-2" color="red" small>Safe chemistry</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="mb-6">
        <v-card class="solution-card elevation-6" style="border-radius: 16px; height: 350px">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="50" color="indigo" class="mr-4">mdi-power-plug</v-icon>
              <h3 class="text-h5 font-weight-bold">Grid-Tie Inverters</h3>
            </div>
            <p class="text-body-2 mb-4">
              Advanced inverters that seamlessly integrate with the Philippine power grid,
              featuring net metering capability and real-time monitoring systems.
            </p>
            <div class="specs">
              <v-chip class="mr-2 mb-2" color="teal" small>98% efficiency</v-chip>
              <v-chip class="mr-2 mb-2" color="cyan" small>Wi-Fi monitoring</v-chip>
              <v-chip class="mr-2 mb-2" color="lime" small>Grid protection</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="mb-6">
        <v-card class="solution-card elevation-6" style="border-radius: 16px; height: 350px">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="50" color="green" class="mr-4">mdi-water-pump</v-icon>
              <h3 class="text-h5 font-weight-bold">Solar Water Systems</h3>
            </div>
            <p class="text-body-2 mb-4">
              Complete solar-powered water pumping and purification systems for agricultural
              and residential use, perfect for remote areas without grid access.
            </p>
            <div class="specs">
              <v-chip class="mr-2 mb-2" color="blue" small>Submersible pumps</v-chip>
              <v-chip class="mr-2 mb-2" color="green" small>Water purification</v-chip>
              <v-chip class="mr-2 mb-2" color="orange" small>Remote monitoring</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-16">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold gradient-title mb-6">Why Choose Our Solutions?</h2>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="3" class="text-center mb-4">
            <v-icon size="60" color="orange" class="mb-3">mdi-weather-sunny</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Tropical Climate Optimized</h4>
            <p class="text-body-2">Designed for Philippine weather conditions</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-4">
            <v-icon size="60" color="blue" class="mb-3">mdi-shield-check</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Proven Reliability</h4>
            <p class="text-body-2">Thousands of successful installations</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-4">
            <v-icon size="60" color="green" class="mb-3">mdi-account-group</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Local Support</h4>
            <p class="text-body-2">Filipino engineers and technicians</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-4">
            <v-icon size="60" color="purple" class="mb-3">mdi-currency-php</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Flexible Financing</h4>
            <p class="text-body-2">Payment plans for every budget</p>
          </v-col>
        </v-row>
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

.solution-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  border: 1px solid rgba(255, 165, 0, 0.1);
  transition: all 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 165, 0, 0.3);
}

.specs {
  margin-top: auto;
}
</style>