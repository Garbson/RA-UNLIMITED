<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Privacy Policy</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        Your privacy is important to us. This policy describes how we collect and use your information.
      </p>
    </div>

    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="privacy-card elevation-4 pa-8" style="border-radius: 20px">
          <div class="privacy-content">
            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">1. Information We Collect</h2>
              <p class="text-body-1 mb-4">
                We collect information that you provide to us directly, including:
              </p>
              <ul class="ml-6 mb-4">
                <li>Full name and contact information</li>
                <li>Property address for solar installation</li>
                <li>Energy consumption information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">2. How We Use Your Information</h2>
              <p class="text-body-1 mb-4">
                We use your information to:
              </p>
              <ul class="ml-6 mb-4">
                <li>Provide personalized solar solution quotes</li>
                <li>Contact you for consultations and follow-up</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">3. Information Sharing</h2>
              <p class="text-body-1 mb-4">
                We do not sell, rent, or share your personal information with third parties, except:
              </p>
              <ul class="ml-6 mb-4">
                <li>With your express permission</li>
                <li>To comply with legal obligations</li>
                <li>With trusted partners who help us provide services</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">4. Data Security</h2>
              <p class="text-body-1 mb-4">
                We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">5. Your Rights</h2>
              <p class="text-body-1 mb-4">
                You have the right to:
              </p>
              <ul class="ml-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">6. Cookies and Similar Technologies</h2>
              <p class="text-body-1 mb-4">
                We use cookies to improve your experience on our website, analyze traffic, and personalize content. You can manage your cookie preferences in your browser settings.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">7. Policy Changes</h2>
              <p class="text-body-1 mb-4">
                This privacy policy may be updated periodically. We will notify you of significant changes through our website or by email.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-h4 font-weight-bold mb-4 text-orange">8. Contact Us</h2>
              <p class="text-body-1 mb-4">
                If you have questions about this privacy policy or want to exercise your rights, please contact us:
              </p>
              <v-card class="contact-card pa-4 mt-4" color="grey-lighten-5">
                <p class="mb-2"><strong>RA UNLIMITED</strong></p>
                <p class="mb-2">Email: privacy@raunlimited.com</p>
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
// Privacy Policy for RA UNLIMITED
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

.privacy-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.2);
}

.privacy-content {
  line-height: 1.7;
  color: #2c3e50;
}

.privacy-content ul {
  list-style-type: disc;
}

.privacy-content li {
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
  .privacy-card {
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