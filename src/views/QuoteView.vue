<template>
  <v-container class="py-8">
    <div class="text-center mb-10">
      <h1 class="display-2 font-weight-bold mb-4 gradient-title">Get a Quote</h1>
      <p class="subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 600px">
        Get your personalized solar energy solution quote in just a few simple steps
      </p>
    </div>

    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8" lg="6" class="px-4">
        <v-card class="quote-card elevation-8" style="border-radius: 20px"
                :class="$vuetify.display.mobile ? 'pa-4' : 'pa-8'">
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.firstName"
                  label="First Name"
                  variant="outlined"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                  variant="outlined"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  variant="outlined"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.phone"
                  label="Phone Number"
                  variant="outlined"
                  :rules="phoneRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.address"
                  label="Property Address"
                  variant="outlined"
                  :rules="addressRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.propertyType"
                  :items="propertyTypes"
                  label="Property Type"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.monthlyBill"
                  label="Monthly Electric Bill (₱)"
                  variant="outlined"
                  type="number"
                  :rules="billRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="form.systemSize"
                  :items="systemSizes"
                  label="Estimated System Size"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="form.additionalInfo"
                  label="Additional Information (Optional)"
                  variant="outlined"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn
                  color="orange"
                  :size="$vuetify.display.mobile ? 'default' : 'large'"
                  style="border-radius: 12px"
                  :class="$vuetify.display.mobile ? 'px-6 py-2' : 'px-8 py-3'"
                  :disabled="!valid"
                  @click="submitQuote"
                  block
                >
                  <v-icon left>mdi-calculator</v-icon>
                  Get My Quote
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col cols="12" class="text-center">
        <h3 class="text-h4 font-weight-bold mb-6">Why Get a Quote From Us?</h3>
        <v-row>
          <v-col cols="12" md="3" class="text-center">
            <v-icon size="50" color="orange" class="mb-3">mdi-lightning-bolt</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Fast Response</h4>
            <p class="text-body-2">Get your quote within 24 hours</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center">
            <v-icon size="50" color="blue" class="mb-3">mdi-account-tie</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Expert Consultation</h4>
            <p class="text-body-2">Free consultation with solar experts</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center">
            <v-icon size="50" color="green" class="mb-3">mdi-cash-multiple</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">Competitive Pricing</h4>
            <p class="text-body-2">Best value for your investment</p>
          </v-col>
          <v-col cols="12" md="3" class="text-center">
            <v-icon size="50" color="purple" class="mb-3">mdi-shield-check</v-icon>
            <h4 class="text-h6 font-weight-bold mb-2">No Obligation</h4>
            <p class="text-body-2">Free quote with no strings attached</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(false)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  propertyType: '',
  monthlyBill: '',
  systemSize: '',
  additionalInfo: ''
})

const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length >= 2) || 'Name must be at least 2 characters'
]

const emailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const phoneRules = [
  v => !!v || 'Phone number is required',
  v => /^[0-9+\-\s()]+$/.test(v) || 'Phone number must be valid'
]

const addressRules = [
  v => !!v || 'Address is required'
]

const billRules = [
  v => !!v || 'Monthly bill is required',
  v => v > 0 || 'Monthly bill must be greater than 0'
]

const propertyTypes = [
  'Residential - Single Family Home',
  'Residential - Condominium',
  'Commercial - Small Business',
  'Commercial - Office Building',
  'Industrial',
  'Agricultural'
]

const systemSizes = [
  'Small (1-3 kW) - For small homes',
  'Medium (4-8 kW) - For average homes',
  'Large (9-15 kW) - For large homes',
  'Extra Large (16+ kW) - For commercial',
  'Not sure - Need consultation'
]

const submitQuote = () => {
  console.log('Quote submitted:', form.value)
  // Aqui você implementaria o envio do formulário
  alert('Obrigado! Entraremos em contato em até 24 horas.')
}
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

.quote-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(255, 165, 0, 0.2);
}
</style>