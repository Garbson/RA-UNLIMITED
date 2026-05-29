<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AboutView from './aboutView.vue'
import EditableText from '../components/EditableText.vue'

const slides = [
  { src: '/img/sun.jpg', keyPrefix: 'hero.slide1' },
  { src: '/img/filipinas02.jpg', keyPrefix: 'hero.slide2' },
  { src: '/img/filipinas04.jpg', keyPrefix: 'hero.slide3' },
  { src: '/img/placaSolar.jpg', keyPrefix: 'hero.slide4' },
]

const defaultSlideHeadlines = [
  'Light reaches\neveryone.',
  'Energy that\nbelongs to the land.',
  'A home, with\nthe lights on.',
  'Sun, stored\nas hope.',
]

const active = ref(0)
let timer

function next() {
  active.value = (active.value + 1) % slides.length
}

onMounted(() => {
  timer = setInterval(next, 6000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-media">
        <TransitionGroup name="hero-fade" tag="div" class="hero-stack">
          <img
            v-for="(s, i) in slides"
            v-show="i === active"
            :key="s.src"
            :src="s.src"
            alt=""
            class="hero-img"
          />
        </TransitionGroup>
        <div class="hero-vignette" />
      </div>

      <div class="hero-content">
        <div class="hero-grid">
          <div class="hero-text">
            <div class="hero-eyebrow eyebrow">
              <EditableText content-key="hero.eyebrow" default="Ra Unlimited — Philippines" />
            </div>
            <h1 class="hero-title display-title">
              <EditableText
                content-key="hero.title"
                :default="'Reaching for the sun,\nso families can find\ntheir way home.'"
                tag="span"
                multiline
              />
            </h1>
            <p class="hero-lead lead">
              <EditableText
                content-key="hero.lead"
                default="We build sustainable solar energy in the places where normal hasn't had a chance — not cities or villages, but homes for families to grow."
                tag="span"
                multiline
              />
            </p>
            <div class="hero-cta">
              <router-link to="/quote" class="btn-solid">
                <EditableText content-key="hero.cta.primary" default="Request a project" tag="span" />
                <span aria-hidden>→</span>
              </router-link>
              <router-link to="/solar-solutions" class="btn-ghost">
                <EditableText content-key="hero.cta.secondary" default="See our work" tag="span" />
              </router-link>
            </div>
          </div>

          <div class="hero-aside">
            <div class="aside-headline">
              <EditableText
                :content-key="`${slides[active].keyPrefix}.title`"
                :default="defaultSlideHeadlines[active]"
                tag="span"
                multiline
              />
            </div>
            <div class="aside-progress">
              <button
                v-for="(s, i) in slides"
                :key="i"
                :class="['dot', { active: i === active }]"
                @click="active = i"
                :aria-label="`Slide ${i + 1}`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section id="about-section" class="section intro">
      <div class="container">
        <div class="intro-eyebrow eyebrow">
          <EditableText content-key="intro.eyebrow" default="Our mission" />
        </div>
        <h2 class="intro-title display-title">
          <EditableText
            content-key="intro.title"
            :default="`We're not recreating\nthe world. We're creating\n*normalcy* where normal\nhasn't had a chance.`"
            tag="span"
            multiline
          />
        </h2>
      </div>

      <div class="container intro-body">
        <div class="intro-col">
          <p class="lead">
            <EditableText
              content-key="intro.lead1"
              default="What is normal? Dinner with family. Dancing in the kitchen. Karaoke until midnight. We're not building cities or villages — we're building places for families to have the opportunities that are the foundation of family."
              tag="span"
              multiline
            />
          </p>
        </div>
        <div class="intro-col">
          <p class="body-text">
            <EditableText
              content-key="intro.lead2"
              default="Without family, things tend to crumble. Without hope, things start to burn. Ra Unlimited doesn't hope for a better future in the Philippines — we know a way to help everyone progress, and find their way home."
              tag="span"
              multiline
            />
          </p>
          <p class="body-text intro-quote">
            <EditableText
              content-key="intro.quote"
              default="Home is in the countryside, beside a warm fire, laughing with friends, and not worrying about anything."
              tag="span"
              multiline
            />
          </p>
        </div>
      </div>
    </section>

    <!-- IMPACT STRIP -->
    <section class="section-tight impact">
      <div class="container impact-grid">
        <div class="impact-item">
          <div class="impact-num">
            <EditableText content-key="impact.1.value" default="1,200+" />
          </div>
          <div class="impact-label">
            <EditableText content-key="impact.1.label" default="Lives reached" />
          </div>
        </div>
        <div class="impact-item">
          <div class="impact-num">
            <EditableText content-key="impact.2.value" default="38" />
          </div>
          <div class="impact-label">
            <EditableText content-key="impact.2.label" default="Communities served" />
          </div>
        </div>
        <div class="impact-item">
          <div class="impact-num">
            <EditableText content-key="impact.3.value" default="100%" />
          </div>
          <div class="impact-label">
            <EditableText content-key="impact.3.label" default="Clean, renewable energy" />
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT WE DO -->
    <section class="section what-we-do">
      <div class="container what-grid">
        <div class="what-cell what-quote">
          <div class="eyebrow">
            <EditableText content-key="what.eyebrow" default="What we do" />
          </div>
          <h3 class="display-title smaller">
            <EditableText
              content-key="what.title"
              :default="'Sustainable energy,\nbuilt with the people\nwho use it.'"
              tag="span"
              multiline
            />
          </h3>
        </div>

        <router-link to="/services" class="what-cell card-link">
          <div class="card-img" style="background-image: url('/img/filipinas03.jpg')" />
          <div class="card-body">
            <div class="card-label">
              <EditableText content-key="card.services.label" default="01 · Services" />
            </div>
            <div class="card-title">
              <EditableText
                content-key="card.services.title"
                default="Installation, maintenance, training."
              />
            </div>
            <div class="card-arrow">→</div>
          </div>
        </router-link>

        <router-link to="/solar-solutions" class="what-cell card-link">
          <div class="card-img" style="background-image: url('/img/placaSolar.jpg')" />
          <div class="card-body">
            <div class="card-label">
              <EditableText content-key="card.solutions.label" default="02 · Solutions" />
            </div>
            <div class="card-title">
              <EditableText
                content-key="card.solutions.title"
                default="Custom solar systems for homes, schools and farms."
              />
            </div>
            <div class="card-arrow">→</div>
          </div>
        </router-link>

        <router-link to="/quote" class="what-cell card-link card-feature">
          <div class="card-img" style="background-image: url('/img/filipinas06.jpg')" />
          <div class="card-body">
            <div class="card-label">
              <EditableText content-key="card.quote.label" default="03 · Get involved" />
            </div>
            <div class="card-title">
              <EditableText
                content-key="card.quote.title"
                default="Tell us about your community — we'll build a plan together."
              />
            </div>
            <div class="card-arrow">→</div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- DEEPER ABOUT -->
    <AboutView />
  </div>
</template>

<style scoped>
.home { color: var(--color-ink); }

/* ============ HERO ============ */
.hero {
  position: relative;
  min-height: clamp(640px, 96vh, 880px);
  overflow: hidden;
  background: var(--color-moss-deep);
}
.hero-media {
  position: absolute;
  inset: 0;
}
.hero-stack { position: absolute; inset: 0; }
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: opacity;
}
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.4s ease;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
.hero-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(42, 42, 36, 0.15) 0%, rgba(42, 42, 36, 0.55) 70%, rgba(42, 42, 36, 0.85) 100%),
    linear-gradient(90deg, rgba(58, 79, 58, 0.45) 0%, rgba(58, 79, 58, 0) 60%);
}
.hero-content {
  position: relative;
  z-index: 2;
  min-height: clamp(640px, 96vh, 880px);
  display: flex;
  align-items: flex-end;
  padding: clamp(40px, 8vh, 96px) 0 clamp(40px, 6vh, 80px);
}
.hero-grid {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 64px;
  align-items: end;
}
.hero-text { color: #fff; }
.hero-eyebrow { color: var(--color-sun); margin-bottom: 24px; }
.hero-title {
  color: #fff;
  font-size: clamp(2.5rem, 6vw, 5rem);
  white-space: pre-line;
  margin-bottom: 28px;
}
.hero-title :deep(em) { color: var(--color-sun); font-style: italic; font-weight: 300; }
.hero-lead {
  color: rgba(255, 255, 255, 0.82);
  max-width: 560px;
  margin-bottom: 36px;
}
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-solid,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.15s, background 0.15s, color 0.15s;
}
.btn-solid {
  background: var(--color-sun);
  color: var(--color-ink);
}
.btn-solid:hover { transform: translateY(-1px); background: #ffce85; }
.btn-ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
}
.btn-ghost:hover { background: rgba(255, 255, 255, 0.16); }

.hero-aside { color: #fff; }
.aside-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.9);
  padding-left: 24px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  white-space: pre-line;
  min-height: 90px;
}
.aside-progress {
  display: flex;
  gap: 10px;
  margin-top: 32px;
  padding-left: 24px;
}
.dot {
  width: 36px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.25s, width 0.25s;
}
.dot.active { background: var(--color-sun); width: 56px; }

/* ============ INTRO ============ */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}
.intro { background: var(--color-cream); }
.intro-eyebrow { margin-bottom: 24px; }
.intro-title {
  font-size: clamp(2rem, 5vw, 4.2rem);
  max-width: 1000px;
  margin-bottom: 64px;
  white-space: pre-line;
}
.intro-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}
.intro-col { max-width: 560px; }
.intro-quote {
  margin-top: 28px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--color-moss);
}

/* ============ IMPACT ============ */
.impact {
  background: var(--color-cream-deep);
  border-top: 1px solid rgba(58, 79, 58, 0.08);
  border-bottom: 1px solid rgba(58, 79, 58, 0.08);
}
.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
.impact-item { text-align: center; }
.impact-num {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--color-moss);
  line-height: 1;
}
.impact-label {
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-ink-soft);
}

/* ============ WHAT WE DO ============ */
.what-we-do { background: var(--color-cream); }
.what-grid {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 24px;
}
.what-quote {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}
.display-title.smaller {
  font-size: clamp(1.75rem, 3vw, 2.6rem);
  color: var(--color-moss);
  white-space: pre-line;
}
.card-link {
  position: relative;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: var(--color-ink);
  display: flex;
  flex-direction: column;
  min-height: 360px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card-link:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}
.card-img {
  background-size: cover;
  background-position: center;
  aspect-ratio: 4/3;
  border-bottom: 1px solid rgba(58, 79, 58, 0.08);
}
.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.card-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-terracotta);
}
.card-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-moss);
  flex: 1;
}
.card-arrow {
  align-self: flex-end;
  font-size: 20px;
  color: var(--color-moss);
  transition: transform 0.2s;
}
.card-link:hover .card-arrow { transform: translateX(4px); }
.card-feature { grid-column: 2 / 4; }
.card-feature .card-img { aspect-ratio: 5/2; }

/* ============ RESPONSIVE ============ */
@media (max-width: 960px) {
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-aside { display: none; }
  .intro-body { grid-template-columns: 1fr; gap: 32px; }
  .impact-grid { grid-template-columns: 1fr; gap: 32px; }
  .what-grid { grid-template-columns: 1fr; }
  .what-quote { grid-column: auto; grid-row: auto; padding: 0 0 16px; }
  .card-feature { grid-column: auto; }
  .container { padding: 0 24px; }
}
@media (max-width: 600px) {
  .hero { min-height: 88vh; }
  .hero-title { font-size: 2.4rem; }
  .btn-solid, .btn-ghost { width: 100%; justify-content: center; }
}
</style>
