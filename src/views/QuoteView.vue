<script setup>
import { ref, computed } from 'vue'
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'
import { api } from '../api/client.js'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  propertyType: '',
  monthlyBill: '',
  systemSize: '',
  notes: '',
})

const submitted = ref(false)
const submitting = ref(false)
const error = ref(null)

const propertyTypes = [
  'Residential — single family',
  'Residential — condominium',
  'Commercial — small business',
  'Commercial — office building',
  'Industrial',
  'Agricultural',
]

const systemSizes = [
  'Small (1–3 kW)',
  'Medium (4–8 kW)',
  'Large (9–15 kW)',
  'Extra large (16+ kW)',
  'Not sure — need consultation',
]

const isValid = computed(() => {
  const f = form.value
  return (
    f.firstName.trim() &&
    f.lastName.trim() &&
    /.+@.+\..+/.test(f.email) &&
    f.phone.trim() &&
    f.address.trim() &&
    f.propertyType &&
    f.monthlyBill > 0
  )
})

async function submit() {
  if (!isValid.value) return
  submitting.value = true
  error.value = null
  try {
    await api('/api/quotes', {
      method: 'POST',
      body: {
        firstName: form.value.firstName.trim(),
        lastName: form.value.lastName.trim(),
        email: form.value.email.trim(),
        phone: form.value.phone.trim(),
        address: form.value.address.trim(),
        propertyType: form.value.propertyType,
        monthlyBill: Number(form.value.monthlyBill),
        systemSize: form.value.systemSize || null,
        notes: form.value.notes.trim() || null,
      },
    })
    submitted.value = true
  } catch (e) {
    error.value = e.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

const reasons = [
  { key: 'fast', title: 'Fast response', desc: 'Get your quote within 24 hours.' },
  { key: 'expert', title: 'Expert consultation', desc: 'Free consultation with our solar engineers.' },
  { key: 'price', title: 'Competitive pricing', desc: 'Best value for your investment.' },
  { key: 'noobl', title: 'No obligation', desc: 'Free quote with no strings attached.' },
]
</script>

<template>
  <div class="quote-page">
    <PageHeader
      eyebrow-key="quote.eyebrow"
      eyebrow-default="Get a quote"
      title-key="quote.title"
      :title-default="'Tell us about your project.'"
      lead-key="quote.lead"
      lead-default="Share a few details and we'll come back with a personalized solar plan within 24 hours."
    />

    <section class="section">
      <div class="container form-wrap">
        <div v-if="submitted" class="thanks">
          <div class="thanks-icon">✓</div>
          <h2 class="display-title smaller">
            <EditableText content-key="quote.thanks.title" default="Thank you." />
          </h2>
          <p class="lead">
            <EditableText
              content-key="quote.thanks.lead"
              default="We received your request and will be in touch within 24 hours."
            />
          </p>
        </div>

        <form v-else class="form" @submit.prevent="submit">
          <div class="row two">
            <label>
              <span>First name</span>
              <input v-model="form.firstName" required />
            </label>
            <label>
              <span>Last name</span>
              <input v-model="form.lastName" required />
            </label>
          </div>
          <div class="row two">
            <label>
              <span>Email</span>
              <input v-model="form.email" type="email" required />
            </label>
            <label>
              <span>Phone</span>
              <input v-model="form.phone" required />
            </label>
          </div>
          <label class="row">
            <span>Property address</span>
            <input v-model="form.address" required />
          </label>
          <div class="row two">
            <label>
              <span>Property type</span>
              <select v-model="form.propertyType" required>
                <option value="" disabled>Select…</option>
                <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
              </select>
            </label>
            <label>
              <span>Monthly bill (₱)</span>
              <input v-model.number="form.monthlyBill" type="number" min="1" required />
            </label>
          </div>
          <label class="row">
            <span>Estimated system size</span>
            <select v-model="form.systemSize">
              <option value="">Optional</option>
              <option v-for="s in systemSizes" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
          <label class="row">
            <span>Notes (optional)</span>
            <textarea v-model="form.notes" rows="4" />
          </label>

          <div v-if="error" class="error">{{ error }}</div>

          <button type="submit" class="submit" :disabled="!isValid || submitting">
            {{ submitting ? 'Sending…' : 'Get my quote' }}
            <span aria-hidden>→</span>
          </button>
        </form>

        <aside class="reasons">
          <h3 class="aside-title">
            <EditableText
              content-key="quote.aside.title"
              default="Why ask us"
            />
          </h3>
          <div v-for="r in reasons" :key="r.key" class="reason">
            <div class="reason-title">
              <EditableText :content-key="`quote.aside.${r.key}.title`" :default="r.title" />
            </div>
            <div class="reason-desc">
              <EditableText :content-key="`quote.aside.${r.key}.desc`" :default="r.desc" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quote-page { color: var(--color-ink); background: var(--color-cream); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.form-wrap {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 56px;
  align-items: start;
}
.form {
  background: #fff;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.row { display: flex; flex-direction: column; gap: 8px; }
.row.two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.row span {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-moss);
  letter-spacing: 0.02em;
}
input, select, textarea {
  font: inherit;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.5px solid rgba(58, 79, 58, 0.18);
  border-radius: 10px;
  background: var(--color-cream-soft);
  color: var(--color-ink);
  transition: border-color 0.15s, background 0.15s;
  font-family: var(--font-sans);
  width: 100%;
  box-sizing: border-box;
}
textarea { resize: vertical; }
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-moss);
  background: #fff;
}
.submit {
  margin-top: 8px;
  background: var(--color-moss);
  color: var(--color-cream);
  font: inherit;
  font-weight: 600;
  padding: 16px 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: background 0.15s, transform 0.05s;
}
.submit:hover:not(:disabled) { background: var(--color-moss-deep); }
.submit:active:not(:disabled) { transform: scale(0.99); }
.submit:disabled { opacity: 0.5; cursor: not-allowed; }

.error {
  background: rgba(199, 82, 42, 0.08);
  color: var(--color-terracotta);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}

.reasons {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.aside-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-moss);
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}
.reason {
  padding: 20px 0;
  border-top: 1px solid rgba(58, 79, 58, 0.12);
}
.reason-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--color-moss);
  margin-bottom: 6px;
}
.reason-desc { font-size: 14px; color: var(--color-ink-soft); line-height: 1.5; }

.thanks {
  background: #fff;
  border-radius: 24px;
  padding: 64px 40px;
  text-align: center;
  border: 1px solid rgba(58, 79, 58, 0.08);
  grid-column: 1 / -1;
}
.thanks-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: var(--color-moss);
  color: var(--color-cream);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 28px;
}
.thanks .display-title.smaller { font-size: 2rem; }
.display-title.smaller {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--color-moss);
}

@media (max-width: 960px) {
  .form-wrap { grid-template-columns: 1fr; }
  .reasons { position: static; }
  .row.two { grid-template-columns: 1fr; }
  .form { padding: 28px; }
  .container { padding: 0 24px; }
}
</style>
