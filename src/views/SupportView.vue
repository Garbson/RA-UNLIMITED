<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Support Center</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        We're here to help you get the most out of your solar energy system
      </p>
    </div>

    <v-row class="mb-12">
      <v-col cols="12" md="4" class="mb-6">
        <v-card class="support-card elevation-6 text-center" style="border-radius: 16px; height: 300px">
          <v-card-text class="pa-6 d-flex flex-column justify-center h-100">
            <v-icon size="60" color="orange" class="mb-4">mdi-phone</v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">24/7 Hotline</h3>
            <p class="text-body-2 mb-4">
              Emergency support and technical assistance available around the clock
            </p>
            <v-btn color="orange" variant="outlined" class="mt-auto">
              Call Now: +63 2 8123 4567
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card class="support-card elevation-6 text-center" style="border-radius: 16px; height: 300px">
          <v-card-text class="pa-6 d-flex flex-column justify-center h-100">
            <v-icon size="60" color="blue" class="mb-4">mdi-email</v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Email Support</h3>
            <p class="text-body-2 mb-4">
              Send us your questions and we'll respond within 4 hours during business days
            </p>
            <v-btn color="blue" variant="outlined" class="mt-auto">
              Email: support@raunlimited.ph
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="mb-6">
        <v-card class="support-card elevation-6 text-center" style="border-radius: 16px; height: 300px">
          <v-card-text class="pa-6 d-flex flex-column justify-center h-100">
            <v-icon size="60" color="green" class="mb-4">mdi-chat</v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Live Chat</h3>
            <p class="text-body-2 mb-4">
              Chat with our support team during business hours for instant help
            </p>
            <v-btn color="green" variant="outlined" class="mt-auto">
              Start Chat
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-12">
      <v-col cols="12">
        <h2 class="text-h3 font-weight-bold text-center mb-8 gradient-title">Frequently Asked Questions</h2>
        <v-expansion-panels variant="accordion" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>How long does a solar system installation take?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              A typical residential solar installation takes 1-3 days, depending on system size and complexity.
              Commercial installations may take 1-2 weeks. We'll provide a detailed timeline during your consultation.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>What happens during typhoon season?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Our solar panels are rated for winds up to 200 km/h and are designed to withstand Philippine weather conditions.
              We use reinforced mounting systems and provide comprehensive insurance coverage.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>How much maintenance do solar panels require?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Solar panels require minimal maintenance. We recommend annual inspections and occasional cleaning.
              Our maintenance packages include monitoring, cleaning, and performance optimization.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>Can I sell excess energy back to the grid?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Yes! Through net metering programs available in most areas of the Philippines, you can sell excess
              energy back to your utility company, earning credits on your electricity bill.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>What financing options are available?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              We offer various financing options including cash payment, installment plans (6-60 months),
              solar loans, and lease-to-own programs. We'll help you find the best option for your budget.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <strong>How do I monitor my system's performance?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              All our systems come with real-time monitoring through a mobile app and web portal.
              You can track energy production, consumption, savings, and system health 24/7.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="contact-support-card pa-8 text-center" style="border-radius: 20px">
          <h3 class="text-h4 font-weight-bold mb-4">Still Need Help?</h3>
          <p class="text-body-1 mb-6">
            Our technical support team is standing by to assist you with any questions or issues
          </p>
          <v-btn color="orange" size="large" class="mr-4 mb-2">
            <v-icon left>mdi-phone</v-icon>
            Call Support
          </v-btn>
          <v-btn color="blue" variant="outlined" size="large" class="mb-2">
            <v-icon left>mdi-email</v-icon>
            Email Us
          </v-btn>
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

.support-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.1);
  transition: all 0.3s ease;
}

.support-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 165, 0, 0.3);
}

.contact-support-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 2px solid rgba(255, 165, 0, 0.2);
}

:deep(.v-expansion-panel-title) {
  font-size: 1.1rem;
  padding: 20px;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 20px;
}
</style>