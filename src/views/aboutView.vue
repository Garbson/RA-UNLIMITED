<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">About Us</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        Discover how we are transforming the Philippines' energy future through sustainable and
        innovative solutions
      </p>
    </div>

    <v-row class="d-flex justify-center" spacing="6">
      <v-col cols="12" md="6" class="mb-6">
        <v-card
          height="650px"
          class="gradientCard elevation-8 card-hover"
          style="border-radius: 20px; overflow: hidden"
        >
          <div class="card-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-lightning-bolt</v-icon>
            <v-card-title class="text-center gradient-text text-h4 font-weight-bold mb-2">
              RA UNLIMITED
            </v-card-title>
            <v-divider
              class="mx-auto"
              style="width: 80px; border-color: rgba(255, 255, 255, 0.3)"
            ></v-divider>
          </div>

          <v-card-text class="pa-6 text-body-1" style="line-height: 1.8">
            <p class="mb-4 font-weight-medium">
              🌟 <strong>We are a pioneering renewable energy company</strong> revolutionizing the
              Philippines' energy landscape.
            </p>
            <p class="mb-4">
              💡 We provide <strong>clean, sustainable, and affordable electricity</strong> by
              harnessing the abundant sunlight of the Filipino archipelago.
            </p>
            <p class="mb-4">
              🔋 Our mission is to create a greener and more prosperous energy future for all
              Filipino communities.
            </p>
            <p class="text-center font-weight-bold text-orange-darken-2 mt-6">
              "Unlimited energy for a sustainable future"
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="mb-6">
        <v-card
          height="650px"
          class="gradientCard elevation-8 card-hover"
          style="border-radius: 20px; overflow: hidden"
        >
          <div class="card-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-target</v-icon>
            <v-card-title class="text-center gradient-text text-h4 font-weight-bold mb-2">
              Our Goals
            </v-card-title>
            <v-divider
              class="mx-auto"
              style="width: 80px; border-color: rgba(255, 255, 255, 0.3)"
            ></v-divider>
          </div>

          <v-card-text class="pa-6">
            <div class="mb-4 d-flex align-start">
              <v-icon class="mr-3 mt-1" color="orange-darken-2">mdi-flash</v-icon>
              <div>
                <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">
                  Power the Philippines
                </h3>
                <p class="text-body-2 text-grey-darken-1">
                  Deliver reliable and sustainable energy for homes, businesses, and communities
                  throughout the country.
                </p>
              </div>
            </div>

            <div class="mb-4 d-flex align-start">
              <v-icon class="mr-3 mt-1" color="green">mdi-earth</v-icon>
              <div>
                <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">
                  Protect the Environment
                </h3>
                <p class="text-body-2 text-grey-darken-1">
                  Reduce dependence on fossil fuels and combat climate change through clean
                  technologies.
                </p>
              </div>
            </div>

            <div class="mb-4 d-flex align-start">
              <v-icon class="mr-3 mt-1" color="blue">mdi-account-group</v-icon>
              <div>
                <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">
                  Empower Communities
                </h3>
                <p class="text-body-2 text-grey-darken-1">
                  Create job opportunities and improve Filipinos' quality of life through
                  sustainable projects.
                </p>
              </div>
            </div>

            <div
              class="text-center mt-6 pa-4"
              style="background: rgba(255, 165, 0, 0.1); border-radius: 12px"
            >
              <p class="font-weight-bold text-orange-darken-2 mb-0">
                🚀 RA UNLIMITED: Powering the Philippines' renewable energy future
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Energy Challenge Section -->
    <v-row class="mt-16 mb-8">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="display-1 font-weight-bold gradient-title mb-4">
          The Energy Challenge in the Philippines
        </h2>
        <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 700px">
          Understanding the real impact of energy poverty on Filipino families and communities
        </p>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center" spacing="4">
      <v-col cols="12" md="3" class="mb-6">
        <v-card
          height="280px"
          class="challengeCard elevation-6 card-hover text-center"
          style="border-radius: 16px"
        >
          <v-card-text class="pa-6 d-flex flex-column justify-center align-center h-100">
            <v-icon size="50" color="red-darken-1" class="mb-4">mdi-home-off</v-icon>
            <h3 class="text-h4 font-weight-bold text-red-darken-1 mb-2">2.1M</h3>
            <h4 class="text-h6 font-weight-bold mb-3 text-grey-darken-3">Households</h4>
            <p class="text-body-2 text-grey-darken-1">
              Still lack access to reliable electricity in rural Philippines
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="mb-6">
        <v-card
          height="280px"
          class="challengeCard elevation-6 card-hover text-center"
          style="border-radius: 16px"
        >
          <v-card-text class="pa-6 d-flex flex-column justify-center align-center h-100">
            <v-icon size="50" color="orange-darken-2" class="mb-4">mdi-clock-alert</v-icon>
            <h3 class="text-h4 font-weight-bold text-orange-darken-2 mb-2">8-12hrs</h3>
            <h4 class="text-h6 font-weight-bold mb-3 text-grey-darken-3">Daily Blackouts</h4>
            <p class="text-body-2 text-grey-darken-1">
              Average power outages experienced by many Filipino communities
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="mb-6">
        <v-card
          height="280px"
          class="challengeCard elevation-6 card-hover text-center"
          style="border-radius: 16px"
        >
          <v-card-text class="pa-6 d-flex flex-column justify-center align-center h-100">
            <v-icon size="50" color="blue-darken-1" class="mb-4">mdi-school</v-icon>
            <h3 class="text-h4 font-weight-bold text-blue-darken-1 mb-2">60%</h3>
            <h4 class="text-h6 font-weight-bold mb-3 text-grey-darken-3">Students Affected</h4>
            <p class="text-body-2 text-grey-darken-1">
              Children struggle to study after dark due to lack of proper lighting
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="mb-6">
        <v-card
          height="280px"
          class="challengeCard elevation-6 card-hover text-center"
          style="border-radius: 16px"
        >
          <v-card-text class="pa-6 d-flex flex-column justify-center align-center h-100">
            <v-icon size="50" color="green-darken-1" class="mb-4">mdi-currency-php</v-icon>
            <h3 class="text-h4 font-weight-bold text-green-darken-1 mb-2">₱500+</h3>
            <h4 class="text-h6 font-weight-bold mb-3 text-grey-darken-3">Monthly Cost</h4>
            <p class="text-body-2 text-grey-darken-1">
              Families spend on candles, batteries, and diesel for basic energy needs
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- How We're Making a Difference Section -->
    <v-row class="mt-16 mb-8">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="display-1 font-weight-bold gradient-title mb-4">
          How We're Making a Difference
        </h2>
        <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 700px">
          Transforming lives through sustainable solar energy solutions
        </p>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center" spacing="6">
      <v-col cols="12" md="4" class="mb-6">
        <v-card
          height="500px"
          class="impactCard elevation-8 card-hover"
          style="border-radius: 20px; overflow: hidden"
        >
          <div class="impact-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-lightbulb-on</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold mb-2">
              Reliable Lighting
            </v-card-title>
          </div>

          <v-card-text class="pa-6">
            <div class="mb-4">
              <h4 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">Before Solar:</h4>
              <p class="text-body-2 text-grey-darken-1 mb-3">
                📚 Children study by candlelight or not at all<br />
                💰 ₱200/month spent on candles and batteries<br />
                🔥 Fire hazards from open flames
              </p>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div>
              <h4 class="text-h6 font-weight-bold mb-2 text-green-darken-2">With Solar:</h4>
              <p class="text-body-2 text-green-darken-1">
                ✨ Bright, safe LED lighting for 8+ hours<br />
                📖 Children can study effectively after dark<br />
                💡 No recurring costs for basic lighting
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card
          height="500px"
          class="impactCard elevation-8 card-hover"
          style="border-radius: 20px; overflow: hidden"
        >
          <div class="impact-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-cellphone</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold mb-2">
              Communication
            </v-card-title>
          </div>

          <v-card-text class="pa-6">
            <div class="mb-4">
              <h4 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">Before Solar:</h4>
              <p class="text-body-2 text-grey-darken-1 mb-3">
                📱 Walk hours to charge phones in town<br />
                🚶 Miss important calls and messages<br />
                💸 Pay ₱20-50 per phone charge
              </p>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div>
              <h4 class="text-h6 font-weight-bold mb-2 text-green-darken-2">With Solar:</h4>
              <p class="text-body-2 text-green-darken-1">
                🔋 Charge multiple devices at home<br />
                🌐 Stay connected with family and opportunities<br />
                💰 Save money on charging fees
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card
          height="500px"
          class="impactCard elevation-8 card-hover"
          style="border-radius: 20px; overflow: hidden"
        >
          <div class="impact-header pa-6 text-center">
            <v-icon size="60" class="mb-4" color="white">mdi-store</v-icon>
            <v-card-title class="text-center text-white text-h5 font-weight-bold mb-2">
              Small Business
            </v-card-title>
          </div>

          <v-card-text class="pa-6">
            <div class="mb-4">
              <h4 class="text-h6 font-weight-bold mb-2 text-grey-darken-3">Before Solar:</h4>
              <p class="text-body-2 text-grey-darken-1 mb-3">
                🏪 Shops close when sun sets<br />
                ❄️ No refrigeration for products<br />
                📉 Limited income opportunities
              </p>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div>
              <h4 class="text-h6 font-weight-bold mb-2 text-green-darken-2">With Solar:</h4>
              <p class="text-body-2 text-green-darken-1">
                🌙 Extend business hours into evening<br />
                🧊 Keep products fresh with refrigeration<br />
                📈 Increase income by 40-60%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Footer -->
  <footer class="footer-section mt-16">
    <v-container>
      <v-row class="py-12">
        <v-col cols="12" md="4" class="mb-6">
          <div class="footer-brand mb-6">
            <h3 class="text-h4 font-weight-bold gradient-text mb-4">RA UNLIMITED</h3>
            <p class="text-body-1 text-grey-lighten-1 mb-4">
              Powering the Philippines' renewable energy future through innovative solar solutions.
            </p>
            <div class="social-links">
              <v-btn icon variant="outlined" color="white" class="mr-3 social-btn" size="large">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon variant="outlined" color="white" class="mr-3 social-btn" size="large">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon variant="outlined" color="white" class="mr-3 social-btn" size="large">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
              <v-btn icon variant="outlined" color="white" class="social-btn" size="large">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <h4 class="text-h6 font-weight-bold text-white mb-4">Contact Information</h4>
          <div class="contact-info">
            <div class="contact-item mb-3 d-flex align-center">
              <v-icon color="orange" class="mr-3">mdi-map-marker</v-icon>
              <div>
                <p class="text-body-2 text-grey-lighten-1 mb-0">
                  123 Renewable Energy Boulevard<br />
                  Makati City, Metro Manila 1226<br />
                  Philippines
                </p>
              </div>
            </div>
            <div class="contact-item mb-3 d-flex align-center">
              <v-icon color="orange" class="mr-3">mdi-phone</v-icon>
              <p class="text-body-2 text-grey-lighten-1 mb-0">+63 2 8123 4567</p>
            </div>
            <div class="contact-item mb-3 d-flex align-center">
              <v-icon color="orange" class="mr-3">mdi-email</v-icon>
              <p class="text-body-2 text-grey-lighten-1 mb-0">info@raunlimited.ph</p>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <h4 class="text-h6 font-weight-bold text-white mb-4">Quick Links</h4>
          <div class="footer-links">
            <v-btn
              variant="text"
              color="grey-lighten-1"
              class="footer-link pa-0 mb-2 justify-start"
              block
            >
              Our Services
            </v-btn>
            <v-btn
              variant="text"
              color="grey-lighten-1"
              class="footer-link pa-0 mb-2 justify-start"
              block
            >
              Solar Solutions
            </v-btn>
            <v-btn
              variant="text"
              color="grey-lighten-1"
              class="footer-link pa-0 mb-2 justify-start"
              block
            >
              Get a Quote
            </v-btn>
            <v-btn
              variant="text"
              color="grey-lighten-1"
              class="footer-link pa-0 mb-2 justify-start"
              block
            >
              Support
            </v-btn>
            <v-btn
              variant="text"
              color="grey-lighten-1"
              class="footer-link pa-0 mb-2 justify-start"
              block
            >
              Careers
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="footer-divider mb-6"></v-divider>

      <v-row class="align-center">
        <v-col cols="12" md="6">
          <p class="text-body-2 text-grey-lighten-1 mb-0">
            © 2024 RA UNLIMITED. All rights reserved.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
          <div class="footer-legal">
            <v-btn variant="text" color="grey-lighten-1" size="small" class="mr-4">
              Privacy Policy
            </v-btn>
            <v-btn variant="text" color="grey-lighten-1" size="small"> Terms of Service </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>
<script setup></script>
<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #343232, #ff7700, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gradient-title {
  background: linear-gradient(135deg, #ff7700, #ffa500, #dcdada);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gradientCard {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 30%, #ffa500 100%);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 165, 0, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.gradientCard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 119, 0, 0.05) 100%);
  pointer-events: none;
}

.card-hover {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.2);
}

.card-header {
  background: linear-gradient(135deg, rgba(255, 119, 0, 0.9) 0%, rgba(255, 165, 0, 0.8) 100%);
  position: relative;
  overflow: hidden;
}

.card-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.v-card-text p {
  transition: all 0.3s ease;
}

.gradientCard:hover .v-card-text p {
  transform: translateX(5px);
}

.v-icon {
  transition: all 0.3s ease;
}

.gradientCard:hover .v-icon {
  transform: scale(1.1) rotate(10deg);
}

/* Efeito de brilho nos ícones */
.card-header .v-icon {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Challenge Cards Styles */
.challengeCard {
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  border: 2px solid rgba(255, 165, 0, 0.1);
  transition: all 0.3s ease;
}

.challengeCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 165, 0, 0.3);
}

/* Impact Cards Styles */
.impactCard {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.2);
  transition: all 0.4s ease;
}

.impactCard:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.15);
}

.impact-header {
  background: linear-gradient(135deg, #ff7700 0%, #ffa500 100%);
  position: relative;
  overflow: hidden;
}

.impact-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  animation: shimmer 4s infinite;
}

/* Footer Styles */
.footer-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
}

.footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 165, 0, 0.05) 0%,
    transparent 50%,
    rgba(255, 119, 0, 0.05) 100%
  );
  pointer-events: none;
}

.social-btn {
  transition: all 0.3s ease;
  border-color: rgba(255, 165, 0, 0.3);
}

.social-btn:hover {
  background-color: rgba(255, 165, 0, 0.1);
  border-color: #ffa500;
  transform: translateY(-2px);
}

.footer-link {
  text-align: left;
  font-weight: normal;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #ffa500 !important;
  background-color: rgba(255, 165, 0, 0.05);
  transform: translateX(5px);
}

.footer-divider {
  border-color: rgba(255, 165, 0, 0.2);
}

.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

/* Enhanced animations for statistics */
.challengeCard .v-icon {
  transition: all 0.3s ease;
}

.challengeCard:hover .v-icon {
  transform: scale(1.2) rotate(5deg);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .card-hover:hover {
    transform: translateY(-4px) scale(1.01);
  }

  .challengeCard:hover {
    transform: translateY(-3px);
  }

  .impactCard:hover {
    transform: translateY(-4px) scale(1.01);
  }

  .footer-link:hover {
    transform: translateX(2px);
  }
}

/* Additional text effects */
.text-h4.font-weight-bold {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-green-darken-2 {
  font-weight: 600;
}

.text-grey-darken-3 {
  font-weight: 600;
}
</style>
