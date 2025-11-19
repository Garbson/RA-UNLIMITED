<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Terms of Service</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        Please read these terms carefully before using our services.
      </p>
    </div>

    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="terms-card elevation-4 pa-8" style="border-radius: 20px">
          <div class="terms-content">
            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">1. Acceptance of Terms</h2>
              <p class="text-body-1 mb-4">
                By accessing and using RA UNLIMITED's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">2. Description of Services</h2>
              <p class="text-body-1 mb-4">
                RA UNLIMITED provides solar energy solutions including:
              </p>
              <ul class="ml-6 mb-4">
                <li>Solar panel installation and maintenance</li>
                <li>Energy consultation and system design</li>
                <li>Solar equipment sales and leasing</li>
                <li>Energy efficiency assessments</li>
                <li>Technical support and customer service</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">3. Eligibility</h2>
              <p class="text-body-1 mb-4">
                Our services are available to individuals and businesses who:
              </p>
              <ul class="ml-6 mb-4">
                <li>Are at least 18 years of age</li>
                <li>Have legal authority to enter into contracts</li>
                <li>Provide accurate and complete information</li>
                <li>Comply with all applicable local laws and regulations</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">4. User Responsibilities</h2>
              <p class="text-body-1 mb-4">
                You agree to:
              </p>
              <ul class="ml-6 mb-4">
                <li>Provide accurate information for quotes and installations</li>
                <li>Maintain safe access to your property for our technicians</li>
                <li>Comply with all local building codes and regulations</li>
                <li>Pay all fees and charges as agreed</li>
                <li>Not interfere with installed solar equipment</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">5. Payment Terms</h2>
              <p class="text-body-1 mb-4">
                Payment terms will be specified in individual service agreements. Generally:
              </p>
              <ul class="ml-6 mb-4">
                <li>Quotes are valid for 30 days unless otherwise specified</li>
                <li>Installation requires signed contract and deposit</li>
                <li>Final payment is due upon completion and inspection</li>
                <li>Late payments may incur additional fees</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">6. Warranties and Guarantees</h2>
              <p class="text-body-1 mb-4">
                We provide warranties as specified in individual service agreements, including:
              </p>
              <ul class="ml-6 mb-4">
                <li>Manufacturer warranties on equipment</li>
                <li>Installation workmanship warranties</li>
                <li>Performance guarantees where applicable</li>
                <li>Maintenance and support terms</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">7. Limitation of Liability</h2>
              <p class="text-body-1 mb-4">
                RA UNLIMITED's liability is limited to the extent permitted by law. We are not liable for:
              </p>
              <ul class="ml-6 mb-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or revenue</li>
                <li>Damages beyond the cost of our services</li>
                <li>Acts of nature or circumstances beyond our control</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">8. Intellectual Property</h2>
              <p class="text-body-1 mb-4">
                All content, designs, and materials provided by RA UNLIMITED remain our intellectual property. You may not reproduce, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">9. Cancellation and Termination</h2>
              <p class="text-body-1 mb-4">
                Either party may terminate services according to the terms specified in individual service agreements. Cancellation policies and fees will be clearly outlined in your contract.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">10. Governing Law</h2>
              <p class="text-body-1 mb-4">
                These terms are governed by the laws of the Philippines. Any disputes will be resolved through arbitration or in Philippine courts as specified in service agreements.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">11. Changes to Terms</h2>
              <p class="text-body-1 mb-4">
                We reserve the right to modify these terms at any time. Changes will be posted on our website and take effect immediately unless otherwise specified.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">12. Contact Information</h2>
              <p class="text-body-1 mb-4">
                For questions about these terms of service, please contact us:
              </p>
              <v-card class="contact-card pa-4 mt-4" color="grey-lighten-5">
                <p class="mb-2"><strong>RA UNLIMITED</strong></p>
                <p class="mb-2">Email: legal@raunlimited.com</p>
                <p class="mb-2">Phone: +63 XXX XXX XXXX</p>
                <p>Address: Philippines</p>
              </v-card>
            </section>

            <v-divider class="my-6"></v-divider>

            <div class="text-center">
              <p class="text-body-2 text-grey-darken-1">
                Last updated: {{ new Date().toLocaleDateString('en-US') }}
              </p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Terms of Service for RA UNLIMITED
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

.terms-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.2);
}

.terms-content {
  line-height: 1.7;
  color: #2c3e50;
}

.terms-content ul {
  list-style-type: disc;
}

.terms-content li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.contact-card {
  border-radius: 12px;
  border: 1px solid rgba(255, 165, 0, 0.1);
}

.text-orange {
  color: #ff7700;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .terms-card {
    padding: 16px !important;
  }

  .text-h4 {
    font-size: 1.3rem !important;
  }

  .display-2 {
    font-size: 1.8rem !important;
  }
}
</style>