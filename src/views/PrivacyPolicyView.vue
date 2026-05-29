<script setup>
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'

const sections = [
  { key: 'collect', title: '1. Information we collect', body: "We collect information you provide to us directly, including your full name and contact details, the property address for solar installation, energy consumption information, and your communication preferences." },
  { key: 'use', title: '2. How we use your information', body: 'We use your information to provide personalized solar solution quotes, contact you for consultations and follow-up, improve our services, and comply with legal and regulatory obligations.' },
  { key: 'share', title: '3. Information sharing', body: 'We do not sell, rent, or share your personal information with third parties — except with your express permission, to comply with legal obligations, with trusted partners who help us provide services, or to protect our rights and safety.' },
  { key: 'security', title: '4. Data security', body: 'We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure or destruction.' },
  { key: 'rights', title: '5. Your rights', body: 'You have the right to access your personal information, correct inaccurate information, request deletion of your data, and withdraw consent at any time.' },
  { key: 'cookies', title: '6. Cookies and similar technologies', body: 'We use cookies to improve your experience on our website, analyze traffic, and personalize content. You can manage your cookie preferences in your browser settings.' },
  { key: 'contact', title: '7. Contact', body: 'If you have questions about this Privacy Policy or how we handle your information, contact us at info@raunlimited.com.' },
]
</script>

<template>
  <div class="legal">
    <PageHeader
      eyebrow-key="privacy.eyebrow"
      eyebrow-default="Privacy"
      title-key="privacy.title"
      title-default="Privacy policy"
      lead-key="privacy.lead"
      lead-default="Your privacy matters. This policy describes how we collect and use your information."
    />

    <section class="section">
      <div class="container legal-grid">
        <aside class="toc">
          <div class="toc-label">
            <EditableText content-key="privacy.toc.label" default="On this page" />
          </div>
          <ol class="toc-list">
            <li v-for="s in sections" :key="s.key">
              <a :href="`#${s.key}`">
                <EditableText :content-key="`privacy.${s.key}.title`" :default="s.title" />
              </a>
            </li>
          </ol>
          <div class="toc-updated">
            <EditableText content-key="privacy.updated" default="Last updated: May 2026" />
          </div>
        </aside>

        <article class="legal-body">
          <section v-for="s in sections" :key="s.key" :id="s.key" class="legal-section">
            <h2 class="legal-title">
              <EditableText :content-key="`privacy.${s.key}.title`" :default="s.title" />
            </h2>
            <p class="legal-text">
              <EditableText
                :content-key="`privacy.${s.key}.body`"
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
