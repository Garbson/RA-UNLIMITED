<script setup>
import { ref } from 'vue'
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'

const channels = [
  { key: 'hotline', icon: 'mdi-phone', title: '24/7 hotline', desc: 'Emergency support and technical assistance around the clock.', cta: '+1 831 224 5335' },
  { key: 'email', icon: 'mdi-email', title: 'Email support', desc: 'Send your questions — we respond within 4 hours on business days.', cta: 'support@raunlimited.ph' },
  { key: 'chat', icon: 'mdi-message-text', title: 'Live chat', desc: 'Chat with our team during business hours for instant help.', cta: 'Start chat' },
]

const faqs = [
  { key: 'install', q: 'How long does a solar installation take?', a: 'A typical residential installation takes 1–3 days depending on system size and complexity. Commercial installations may take 1–2 weeks. We provide a detailed timeline during your consultation.' },
  { key: 'typhoon', q: 'What happens during typhoon season?', a: 'Our solar panels are rated for winds up to 200 km/h and are designed to withstand Philippine weather conditions. We use reinforced mounting and provide comprehensive insurance coverage.' },
  { key: 'maintain', q: 'How much maintenance do solar panels require?', a: 'Solar panels require minimal maintenance. We recommend annual inspections and occasional cleaning. Our maintenance packages include monitoring, cleaning and performance optimization.' },
  { key: 'sell', q: 'Can I sell excess energy back to the grid?', a: 'Yes. Through net metering programs available in most areas of the Philippines, you can sell excess energy back to your utility company, earning credits on your bill.' },
  { key: 'finance', q: 'What financing options are available?', a: 'We offer cash payment, installment plans (6–60 months), solar loans, and lease-to-own programs. We will help you find the best option for your budget.' },
  { key: 'monitor', q: 'How do I monitor system performance?', a: 'All systems include real-time monitoring through a mobile app and web portal. Track production, consumption, savings and system health 24/7.' },
]

const open = ref(faqs[0].key)
function toggle(key) {
  open.value = open.value === key ? null : key
}
</script>

<template>
  <div class="support">
    <PageHeader
      eyebrow-key="support.eyebrow"
      eyebrow-default="Support"
      title-key="support.title"
      :title-default="`We're here to help —\nbefore, during and after.`"
      lead-key="support.lead"
      lead-default="From your first quote to a decade of operation, we stand behind every installation we make."
    />

    <section class="section">
      <div class="container">
        <div class="channels">
          <article v-for="c in channels" :key="c.key" class="channel">
            <div class="channel-icon"><i :class="`mdi ${c.icon}`" /></div>
            <h3 class="channel-title">
              <EditableText :content-key="`support.${c.key}.title`" :default="c.title" />
            </h3>
            <p class="channel-desc body-text">
              <EditableText
                :content-key="`support.${c.key}.desc`"
                :default="c.desc"
                multiline
                tag="span"
              />
            </p>
            <div class="channel-cta">
              <EditableText :content-key="`support.${c.key}.cta`" :default="c.cta" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section faq-section">
      <div class="container faq-wrap">
        <div class="faq-head">
          <div class="eyebrow">
            <EditableText content-key="support.faq.eyebrow" default="FAQs" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="support.faq.title"
              :default="'Questions we hear\nmost often.'"
              multiline
              tag="span"
            />
          </h2>
        </div>

        <div class="faq-list">
          <div v-for="f in faqs" :key="f.key" :class="['faq', { open: open === f.key }]">
            <button class="faq-q" @click="toggle(f.key)">
              <span>
                <EditableText :content-key="`support.faq.${f.key}.q`" :default="f.q" />
              </span>
              <span class="faq-toggle">{{ open === f.key ? '−' : '+' }}</span>
            </button>
            <Transition name="acc">
              <div v-if="open === f.key" class="faq-a">
                <EditableText
                  :content-key="`support.faq.${f.key}.a`"
                  :default="f.a"
                  multiline
                  tag="span"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tight cta-band">
      <div class="container cta">
        <div>
          <h3 class="display-title smaller">
            <EditableText content-key="support.cta.title" default="Still need help?" />
          </h3>
          <p class="lead">
            <EditableText
              content-key="support.cta.lead"
              default="Our team is standing by for any question or issue."
            />
          </p>
        </div>
        <div class="cta-actions">
          <a href="tel:+18312245335" class="cta-btn">
            <EditableText content-key="support.cta.call" default="Call support" tag="span" />
          </a>
          <a href="mailto:support@raunlimited.ph" class="cta-btn-ghost">
            <EditableText content-key="support.cta.email" default="Email us" tag="span" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.support { color: var(--color-ink); background: var(--color-cream); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.channel {
  background: #fff;
  border-radius: 24px;
  padding: 36px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.channel-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--color-cream-deep);
  display: grid;
  place-items: center;
  color: var(--color-moss);
  font-size: 24px;
}
.channel-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  color: var(--color-moss);
  margin: 0;
}
.channel-desc { margin: 0; }
.channel-cta {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--color-terracotta);
  margin-top: auto;
  padding-top: 8px;
}

.faq-section { background: var(--color-cream-soft); }
.faq-wrap { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: start; }
.faq-head .eyebrow { margin-bottom: 16px; }
.display-title.smaller {
  font-size: clamp(1.75rem, 3.5vw, 2.6rem);
  color: var(--color-moss);
  white-space: pre-line;
  margin: 0;
}
.faq-list { display: flex; flex-direction: column; }
.faq { border-bottom: 1px solid rgba(58, 79, 58, 0.12); }
.faq-q {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font: inherit;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  padding: 22px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.faq-toggle {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-cream-deep);
  display: grid;
  place-items: center;
  font-size: 18px;
  color: var(--color-moss);
  transition: background 0.15s;
}
.faq.open .faq-toggle { background: var(--color-terracotta); color: #fff; }
.faq-a {
  padding-bottom: 22px;
  color: var(--color-ink-soft);
  line-height: 1.7;
  font-size: 15px;
}
.acc-enter-active, .acc-leave-active { transition: opacity 0.15s; }
.acc-enter-from, .acc-leave-to { opacity: 0; }

.cta-band { background: var(--color-moss); color: var(--color-cream); }
.cta { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; align-items: center; }
.cta .display-title.smaller { color: #fff; margin-bottom: 12px; }
.cta .lead { color: rgba(245, 240, 230, 0.85); margin: 0; }
.cta-actions { display: flex; gap: 12px; justify-self: end; flex-wrap: wrap; }
.cta-btn, .cta-btn-ghost {
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  transition: transform 0.15s, background 0.15s;
}
.cta-btn { background: var(--color-sun); color: var(--color-ink); }
.cta-btn:hover { background: #ffce85; transform: translateY(-1px); }
.cta-btn-ghost {
  background: rgba(245, 240, 230, 0.08);
  color: var(--color-cream);
  border: 1px solid rgba(245, 240, 230, 0.25);
}
.cta-btn-ghost:hover { background: rgba(245, 240, 230, 0.15); }

@media (max-width: 960px) {
  .channels { grid-template-columns: 1fr; }
  .faq-wrap { grid-template-columns: 1fr; gap: 32px; }
  .cta { grid-template-columns: 1fr; }
  .cta-actions { justify-self: stretch; }
  .container { padding: 0 24px; }
}
</style>
