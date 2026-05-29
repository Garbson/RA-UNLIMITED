<script setup>
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'

const services = [
  {
    key: 'residential',
    number: '01',
    title: 'Residential solar',
    intro: 'Complete solar solutions for Filipino homes.',
    bullets: [
      'Solar panel installation',
      'Battery storage systems',
      'Grid-tie inverters',
      '24/7 monitoring',
      'Maintenance & support',
    ],
  },
  {
    key: 'commercial',
    number: '02',
    title: 'Commercial solar',
    intro: 'Large-scale installations for businesses.',
    bullets: [
      'Custom system design',
      'Industrial-grade equipment',
      'Energy management systems',
      'ROI analysis & financing',
      'Professional installation',
    ],
  },
  {
    key: 'community',
    number: '03',
    title: 'Community projects',
    intro: 'Bringing clean energy to entire villages.',
    bullets: [
      'Rural electrification',
      'School & clinic solar',
      'Water pumping systems',
      'Street lighting',
      'Community training',
    ],
  },
]
</script>

<template>
  <div class="services">
    <PageHeader
      eyebrow-key="services.eyebrow"
      eyebrow-default="Services"
      title-key="services.title"
      :title-default="'Solar energy solutions\nfor every kind of community.'"
      lead-key="services.lead"
      lead-default="From a single rooftop to a whole village — we design, install and maintain solar systems that fit the place and the people."
    />

    <section class="section">
      <div class="container">
        <div class="services-grid">
          <article v-for="s in services" :key="s.key" class="service-card">
            <div class="service-num">
              <EditableText :content-key="`services.${s.key}.number`" :default="s.number" />
            </div>
            <h3 class="service-title">
              <EditableText :content-key="`services.${s.key}.title`" :default="s.title" />
            </h3>
            <p class="service-intro lead">
              <EditableText :content-key="`services.${s.key}.intro`" :default="s.intro" />
            </p>
            <ul class="service-list">
              <li v-for="(b, i) in s.bullets" :key="i">
                <span class="dot" />
                <EditableText
                  :content-key="`services.${s.key}.bullet${i + 1}`"
                  :default="b"
                  tag="span"
                />
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section-tight cta-band">
      <div class="container cta">
        <div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="services.cta.title"
              :default="'Have a project in mind?'"
            />
          </h2>
          <p class="lead">
            <EditableText
              content-key="services.cta.lead"
              default="Tell us about your home, business or community. We'll come back with a plan tailored to your needs."
              multiline
              tag="span"
            />
          </p>
        </div>
        <router-link to="/quote" class="cta-btn">
          <EditableText content-key="services.cta.button" default="Start a project" tag="span" />
          <span>→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services { color: var(--color-ink); background: var(--color-cream); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.service-card {
  background: #fff;
  border-radius: 24px;
  padding: 40px 32px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.25s, box-shadow 0.25s;
}
.service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lift); }
.service-num {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-terracotta);
  letter-spacing: -0.02em;
}
.service-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0;
}
.service-intro { margin: 0; font-size: 1.05rem; }
.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(58, 79, 58, 0.08);
  padding-top: 20px;
}
.service-list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: var(--color-ink-soft);
  font-size: 15px;
  line-height: 1.5;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-sun);
  margin-top: 9px;
  flex-shrink: 0;
}

.cta-band { background: var(--color-moss); color: var(--color-cream); }
.cta {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  align-items: center;
}
.cta .display-title.smaller { color: #fff; font-size: clamp(1.6rem, 2.5vw, 2.4rem); margin-bottom: 12px; }
.cta .lead { color: rgba(245, 240, 230, 0.85); margin: 0; }
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--color-sun);
  color: var(--color-ink);
  padding: 18px 32px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  justify-self: end;
  transition: transform 0.15s, background 0.15s;
}
.cta-btn:hover { background: #ffce85; transform: translateY(-1px); }

@media (max-width: 960px) {
  .services-grid { grid-template-columns: 1fr; }
  .cta { grid-template-columns: 1fr; }
  .cta-btn { justify-self: stretch; justify-content: center; }
  .container { padding: 0 24px; }
}
</style>
