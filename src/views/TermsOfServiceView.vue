<script setup>
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'

const sections = [
  { key: 'acceptance', title: '1. Acceptance of terms', body: 'By accessing and using our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.' },
  { key: 'services', title: '2. Our services', body: 'Ra Unlimited provides solar energy solutions including consultation, system design, installation, maintenance and ongoing support throughout the Philippines.' },
  { key: 'quotes', title: '3. Quotes and pricing', body: 'All quotes are provided in good faith based on the information available at the time. Final pricing may vary based on site conditions, regulatory requirements and market factors at the time of installation.' },
  { key: 'warranty', title: '4. Warranties and guarantees', body: 'We stand behind the quality of our work. Specific warranty terms apply to equipment (manufacturer warranties) and workmanship (Ra Unlimited warranty). Details are provided with every installation.' },
  { key: 'liability', title: '5. Limitation of liability', body: 'Ra Unlimited is not liable for indirect, incidental or consequential damages arising from the use of our services, except as required by applicable law.' },
  { key: 'changes', title: '6. Changes to terms', body: 'We may update these Terms from time to time. We will post any changes on this page with a revised effective date.' },
  { key: 'contact', title: '7. Contact', body: 'Questions about these Terms? Reach us at info@raunlimited.com.' },
]
</script>

<template>
  <div class="legal">
    <PageHeader
      eyebrow-key="terms.eyebrow"
      eyebrow-default="Terms"
      title-key="terms.title"
      title-default="Terms of service"
      lead-key="terms.lead"
      lead-default="The rules and agreements that apply when you use Ra Unlimited's website and services."
    />

    <section class="section">
      <div class="container legal-grid">
        <aside class="toc">
          <div class="toc-label">
            <EditableText content-key="terms.toc.label" default="On this page" />
          </div>
          <ol class="toc-list">
            <li v-for="s in sections" :key="s.key">
              <a :href="`#${s.key}`">
                <EditableText :content-key="`terms.${s.key}.title`" :default="s.title" />
              </a>
            </li>
          </ol>
          <div class="toc-updated">
            <EditableText content-key="terms.updated" default="Last updated: May 2026" />
          </div>
        </aside>

        <article class="legal-body">
          <section v-for="s in sections" :key="s.key" :id="s.key" class="legal-section">
            <h2 class="legal-title">
              <EditableText :content-key="`terms.${s.key}.title`" :default="s.title" />
            </h2>
            <p class="legal-text">
              <EditableText
                :content-key="`terms.${s.key}.body`"
                :default="s.body"
                multiline
                tag="span"
              />
            </p>
          </section>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal { color: var(--color-ink); background: var(--color-cream); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.legal-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
  align-items: start;
}
.toc {
  position: sticky;
  top: 100px;
  font-size: 14px;
}
.toc-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: 16px;
}
.toc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toc-list a {
  color: var(--color-ink-soft);
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;
  transition: color 0.15s;
}
.toc-list a:hover { color: var(--color-moss); }
.toc-updated { font-size: 13px; color: var(--color-ink-soft); }

.legal-body { display: flex; flex-direction: column; gap: 48px; max-width: 720px; }
.legal-section { scroll-margin-top: 100px; }
.legal-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0 0 16px;
}
.legal-text {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-ink-soft);
  margin: 0;
}

@media (max-width: 960px) {
  .legal-grid { grid-template-columns: 1fr; gap: 32px; }
  .toc { position: static; }
  .container { padding: 0 24px; }
}
</style>
