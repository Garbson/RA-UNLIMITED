<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { api } from '../api/client.js'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const { t } = useI18n()

const form = ref({
  name: '',
  org: '',
  email: '',
  phone: '',
  location: '',
  message: '',
})
const submitting = ref(false)
const submitted = ref(false)
const error = ref(null)

const isValid = computed(() => {
  return (
    form.value.name.trim() &&
    /.+@.+\..+/.test(form.value.email) &&
    form.value.phone.trim() &&
    form.value.location.trim()
  )
})

async function submit() {
  if (!isValid.value) return
  submitting.value = true
  error.value = null
  try {
    const [firstName, ...rest] = form.value.name.trim().split(' ')
    const lastName = rest.join(' ') || '-'
    await api('/api/quotes', {
      method: 'POST',
      body: {
        firstName,
        lastName,
        email: form.value.email.trim(),
        phone: form.value.phone.trim(),
        address: form.value.location.trim(),
        propertyType: form.value.org.trim() || 'Partner inquiry',
        monthlyBill: 1, // placeholder — backend requires > 0
        systemSize: null,
        notes: form.value.message.trim() || null,
      },
    })
    submitted.value = true
  } catch (e) {
    error.value = e.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

function close() {
  emit('close')
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      submitted.value = false
      error.value = null
      await nextTick()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <Transition name="modal">
    <div v-if="open" class="modal-backdrop" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="modal-close" @click="close" :aria-label="t('partner.close')">×</button>

        <div v-if="!submitted" class="modal-body">
          <div class="modal-head">
            <h2 class="modal-title">{{ t('partner.title') }}</h2>
            <p class="modal-sub">{{ t('partner.subtitle') }}</p>
          </div>
          <form class="modal-form" @submit.prevent="submit">
            <div class="row">
              <label>
                <span>{{ t('partner.name') }} *</span>
                <input v-model="form.name" required />
              </label>
              <label>
                <span>{{ t('partner.org') }}</span>
                <input v-model="form.org" />
              </label>
            </div>
            <div class="row">
              <label>
                <span>{{ t('partner.email') }} *</span>
                <input v-model="form.email" type="email" required />
              </label>
              <label>
                <span>{{ t('partner.phone') }} *</span>
                <input v-model="form.phone" required />
              </label>
            </div>
            <label class="full">
              <span>{{ t('partner.location') }} *</span>
              <input v-model="form.location" required />
            </label>
            <label class="full">
              <span>{{ t('partner.message') }}</span>
              <textarea v-model="form.message" rows="4" />
            </label>

            <div v-if="error" class="error">{{ error }}</div>

            <button type="submit" class="submit" :disabled="!isValid || submitting">
              {{ submitting ? t('partner.sending') : t('partner.submit') }}
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>

        <div v-else class="modal-body thanks">
          <div class="thanks-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#F97316" stroke-width="1.5" />
              <path d="M7 12.5L10.5 16L17 9" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="modal-title">{{ t('partner.thanks.title') }}</h2>
          <p class="modal-sub">{{ t('partner.thanks.body') }}</p>
          <button class="submit" @click="close">{{ t('partner.close') }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 18, 40, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  overflow-y: auto;
}
.modal {
  background: #fff;
  border-radius: 24px;
  max-width: 560px;
  width: 100%;
  padding: 48px 40px 40px;
  position: relative;
  box-shadow: var(--shadow-lift);
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: var(--color-ink-soft);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.modal-close:hover { background: rgba(26, 29, 36, 0.05); color: var(--color-ink); }

.modal-head { margin-bottom: 24px; }
.modal-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  color: var(--color-blue);
}
.modal-sub {
  color: var(--color-ink-soft);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

.modal-form { display: flex; flex-direction: column; gap: 16px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.full { display: flex; flex-direction: column; gap: 6px; }
.row label, .full label { display: flex; flex-direction: column; gap: 6px; }
label > span {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-blue);
  letter-spacing: 0.02em;
}
input, textarea {
  font: inherit;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.5px solid rgba(26, 29, 36, 0.12);
  border-radius: 10px;
  background: var(--color-cream-soft);
  color: var(--color-ink);
  transition: border-color 0.15s, background 0.15s;
  font-family: var(--font-sans);
  width: 100%;
  box-sizing: border-box;
}
textarea { resize: vertical; min-height: 96px; }
input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-orange);
  background: #fff;
}
.submit {
  margin-top: 8px;
  background: var(--color-orange);
  color: #fff;
  font: inherit;
  font-weight: 600;
  padding: 14px 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.15s, transform 0.05s;
}
.submit:hover:not(:disabled) { background: #ea580c; }
.submit:active:not(:disabled) { transform: scale(0.99); }
.submit:disabled { opacity: 0.5; cursor: not-allowed; }
.error {
  background: rgba(178, 37, 53, 0.08);
  color: var(--color-blue);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}

.thanks { text-align: center; padding: 24px 0; }
.thanks-icon { display: flex; justify-content: center; margin-bottom: 16px; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-active .modal, .modal-leave-active .modal {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-enter-from { opacity: 0; }
.modal-enter-from .modal { transform: translateY(40px) scale(0.96); }
.modal-leave-to { opacity: 0; }
.modal-leave-to .modal { transform: translateY(20px) scale(0.98); }

@media (max-width: 600px) {
  .modal { padding: 40px 24px 24px; }
  .row { grid-template-columns: 1fr; }
}
</style>
