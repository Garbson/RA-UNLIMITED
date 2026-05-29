<script setup>
import EditableText from '../components/EditableText.vue'
import PageHeader from '../components/PageHeader.vue'

const solutions = [
  {
    key: 'panels',
    title: 'High-efficiency panels',
    body: 'Premium monocrystalline panels selected for tropical climates — maximum power output even in high humidity.',
    tags: ['25-year warranty', '21% efficiency', 'Typhoon-resistant'],
  },
  {
    key: 'storage',
    title: 'Smart battery storage',
    body: 'Lithium-ion battery systems with intelligent energy management — ensuring power availability during outages.',
    tags: ['10-year warranty', '6000+ cycles', 'Safe chemistry'],
  },
  {
    key: 'inverters',
    title: 'Grid-tie inverters',
    body: 'Advanced inverters integrated with the Philippine power grid, featuring net metering and real-time monitoring.',
    tags: ['98% efficiency', 'Wi-Fi monitoring', 'Grid protection'],
  },
  {
    key: 'water',
    title: 'Solar water systems',
    body: 'Solar-powered water pumping and purification for agricultural and residential use, perfect for off-grid sites.',
    tags: ['Submersible pumps', 'Water purification', 'Remote monitoring'],
  },
]

const reasons = [
  { key: 'tropical', title: 'Built for the tropics', desc: 'Designed for Philippine weather conditions.' },
  { key: 'reliable', title: 'Proven reliability', desc: 'Thousands of successful installations.' },
  { key: 'local', title: 'Local support', desc: 'Filipino engineers and technicians on the ground.' },
  { key: 'financing', title: 'Flexible financing', desc: 'Payment plans for every budget.' },
]
</script>

<template>
  <div class="solutions">
    <PageHeader
      eyebrow-key="solutions.eyebrow"
      eyebrow-default="Solar solutions"
      title-key="solutions.title"
      :title-default="'Technology designed\nfor the archipelago.'"
      lead-key="solutions.lead"
      lead-default="Solar systems engineered for tropical weather, typhoons and remote terrain — built to last and easy to maintain."
    />

    <section class="section">
      <div class="container">
        <div class="solutions-grid">
          <article v-for="s in solutions" :key="s.key" class="solution-card">
            <h3 class="solution-title">
              <EditableText :content-key="`solutions.${s.key}.title`" :default="s.title" />
            </h3>
            <p class="solution-body body-text">
              <EditableText
                :content-key="`solutions.${s.key}.body`"
                :default="s.body"
                multiline
                tag="span"
              />
            </p>
            <div class="tag-row">
              <span v-for="(t, i) in s.tags" :key="i" class="tag">
                <EditableText :content-key="`solutions.${s.key}.tag${i + 1}`" :default="t" />
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section reasons-section">
      <div class="container">
        <div class="reasons-head">
          <div class="eyebrow">
            <EditableText content-key="solutions.why.eyebrow" default="Why us" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="solutions.why.title"
              default="Why choose our solutions."
            />
          </h2>
        </div>
        <div class="reasons-grid">
          <div v-for="r in reasons" :key="r.key" class="reason">
            <h4 class="reason-title">
              <EditableText :content-key="`solutions.why.${r.key}.title`" :default="r.title" />
            </h4>
            <p class="reason-desc">
              <EditableText :content-key="`solutions.why.${r.key}.desc`" :default="r.desc" />
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.solutions { color: var(--color-ink); background: var(--color-cream); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.solution-card {
  background: #fff;
  border-radius: 24px;
  padding: 36px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.25s, box-shadow 0.25s;
}
.solution-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lift); }
.solution-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0;
}
.solution-body { margin: 0; }
.tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
.tag {
  background: var(--color-cream-deep);
  color: var(--color-moss);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.reasons-section { background: var(--color-cream-soft); }
.reasons-head { max-width: 720px; margin-bottom: 64px; }
.reasons-head .eyebrow { margin-bottom: 16px; }
.display-title.smaller {
  font-size: clamp(1.75rem, 3.5vw, 2.8rem);
  color: var(--color-moss);
}
.reasons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.reason {
  padding-top: 28px;
  border-top: 2px solid var(--color-terracotta);
}
.reason-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0 0 12px;
}
.reason-desc { font-size: 14px; color: var(--color-ink-soft); margin: 0; line-height: 1.5; }

@media (max-width: 960px) {
  .solutions-grid { grid-template-columns: 1fr; }
  .reasons-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
  .container { padding: 0 24px; }
}
@media (max-width: 600px) {
  .reasons-grid { grid-template-columns: 1fr; }
}
</style>
