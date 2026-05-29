<script setup>
import EditableText from '../components/EditableText.vue'

const team = [
  {
    key: 'paul',
    img: '/img/paul.png',
    name: 'Paul Jacobchuk',
    role: 'Founder & CEO',
    bio: "Paul is the visionary founder of Ra Unlimited. An electrical engineer trained at the University of Washington, he brings over a decade of experience in business development and clean-energy innovation. His passion for empowering underserved communities drives our mission to deliver affordable, reliable electricity through solar microgrids — fostering education, health and economic stability in remote areas.",
  },
  {
    key: 'garbson',
    img: '/img/garbson.png',
    name: 'Garbson Souza',
    role: 'Chief Technology Officer',
    bio: "Garbson leads the digital backbone of our renewable-energy initiatives. With years of hands-on experience crafting intuitive web applications across four countries, he specializes in responsive design and user-centric interfaces — ensuring seamless platforms that support our mission of sustainable energy access.",
  },
  {
    key: 'ehloura',
    img: '/img/Ehloura.png',
    name: 'Ehloura Jacobchuk',
    role: 'Co-Founder · Board Advisor',
    bio: "A resilient Filipina from Cagayan de Oro, Ehloura brings strategic wisdom to guide our growth and impact. With a career rooted in community leadership, she advises on ethical governance and inclusive environments, mentoring startups and championing women's advancement across the Philippines.",
  },
  {
    key: 'adel',
    img: '/img/del.png',
    name: 'Adel Macatangay',
    role: 'Chief Operating Officer',
    bio: "Dynamic business leader with 20+ years of international experience across the Philippines, US, UK and Australia. Adel has a proven track record in strategic planning, client engagement and cross-functional leadership — building strong relationships and delivering sustainable outcomes.",
  },
]

const challenges = [
  { num: '2.1M', label: 'Households', desc: 'Still lack access to reliable electricity in rural Philippines' },
  { num: '8–12h', label: 'Daily blackouts', desc: 'Average power outages in many Filipino communities' },
  { num: '60%', label: 'Students affected', desc: 'Children struggle to study after dark due to lack of light' },
  { num: '₱500+', label: 'Monthly cost', desc: 'Spent on candles, batteries and diesel for basic needs' },
]

const impact = [
  {
    key: 'lighting',
    title: 'Reliable lighting',
    before: 'Children study by candlelight or not at all. ₱200/month spent on candles and batteries. Fire hazards from open flames.',
    after: 'Bright, safe LED lighting for 8+ hours. Children study effectively after dark. No recurring costs.',
  },
  {
    key: 'comms',
    title: 'Staying connected',
    before: 'Walking hours to charge phones in town. Missing important calls. Paying ₱20–50 per charge.',
    after: 'Charge multiple devices at home. Stay connected with family and opportunities. Save money every month.',
  },
  {
    key: 'business',
    title: 'Small business growth',
    before: 'Shops close at sunset. No refrigeration for products. Limited income opportunities.',
    after: 'Extend hours into the evening. Keep products fresh with refrigeration. Income up 40–60%.',
  },
]
</script>

<template>
  <div class="about">
    <!-- MISSION + GOALS -->
    <section class="section split">
      <div class="container split-grid">
        <div class="split-col">
          <div class="eyebrow">
            <EditableText content-key="mission.eyebrow" default="Who we are" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="mission.title"
              :default="'A pioneering renewable\nenergy company.'"
              tag="span"
              multiline
            />
          </h2>
          <p class="lead">
            <EditableText
              content-key="mission.lead"
              default="We provide clean, sustainable and affordable electricity by harnessing the abundant sunlight of the Filipino archipelago — building a greener, more prosperous energy future for every community."
              tag="span"
              multiline
            />
          </p>
          <p class="quote serif">
            <EditableText
              content-key="mission.quote"
              default="“Unlimited energy for a sustainable future.”"
            />
          </p>
        </div>

        <div class="split-col">
          <div class="goal" v-for="(_, i) in 3" :key="i">
            <div class="goal-num">0{{ i + 1 }}</div>
            <div>
              <h3 class="goal-title">
                <EditableText
                  :content-key="`goals.${i + 1}.title`"
                  :default="['Power the Philippines', 'Protect the environment', 'Empower communities'][i]"
                />
              </h3>
              <p class="body-text">
                <EditableText
                  :content-key="`goals.${i + 1}.desc`"
                  :default="[
                    'Deliver reliable, sustainable energy for homes, businesses and communities across the country.',
                    'Reduce dependence on fossil fuels and combat climate change through clean technology.',
                    'Create jobs and improve quality of life through community-led sustainable projects.',
                  ][i]"
                  multiline
                  tag="span"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA QUOTE -->
    <section class="section-tight cta-quote-band">
      <div class="container cta-quote">
        <div class="cta-quote-text">
          <h2 class="display-title smaller">
            <EditableText
              content-key="cta.title"
              :default="'Ready to power\nyour future?'"
              tag="span"
              multiline
            />
          </h2>
          <p class="lead">
            <EditableText
              content-key="cta.lead"
              default="Join the families and communities who have already made the switch to clean, reliable solar energy — saving money while helping the environment."
              tag="span"
              multiline
            />
          </p>
          <div class="cta-chips">
            <span class="chip">
              <EditableText content-key="cta.chip1" default="Save ₱500+ monthly" />
            </span>
            <span class="chip">
              <EditableText content-key="cta.chip2" default="24/7 reliable power" />
            </span>
            <span class="chip">
              <EditableText content-key="cta.chip3" default="25-year warranty" />
            </span>
          </div>
        </div>
        <div class="cta-quote-side">
          <router-link to="/quote" class="cta-btn">
            <span class="cta-btn-label">
              <EditableText content-key="cta.button" default="Get a free quote" />
            </span>
            <span class="cta-btn-arrow">→</span>
          </router-link>
          <p class="micro">
            <EditableText content-key="cta.micro" default="Response within 24 hours." />
          </p>
        </div>
      </div>
    </section>

    <!-- CHALLENGE -->
    <section class="section challenge-section">
      <div class="container">
        <div class="section-head">
          <div class="eyebrow">
            <EditableText content-key="challenge.eyebrow" default="The challenge" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="challenge.title"
              default="Energy poverty is still real in the Philippines."
              tag="span"
              multiline
            />
          </h2>
          <p class="lead">
            <EditableText
              content-key="challenge.lead"
              default="Understanding the real impact of energy poverty on Filipino families and communities."
              tag="span"
              multiline
            />
          </p>
        </div>

        <div class="stats-grid">
          <div v-for="(c, i) in challenges" :key="i" class="stat-card">
            <div class="stat-num">
              <EditableText :content-key="`challenge.${i + 1}.num`" :default="c.num" />
            </div>
            <div class="stat-label">
              <EditableText :content-key="`challenge.${i + 1}.label`" :default="c.label" />
            </div>
            <div class="stat-desc">
              <EditableText :content-key="`challenge.${i + 1}.desc`" :default="c.desc" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACT BEFORE / AFTER -->
    <section class="section impact-section">
      <div class="container">
        <div class="section-head">
          <div class="eyebrow">
            <EditableText content-key="impact.eyebrow" default="How we make a difference" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="impact.title"
              default="Before solar. With solar."
              tag="span"
              multiline
            />
          </h2>
        </div>

        <div class="impact-grid">
          <article v-for="(i, idx) in impact" :key="i.key" class="impact-card">
            <h3 class="impact-card-title">
              <EditableText
                :content-key="`impact.${i.key}.title`"
                :default="i.title"
              />
            </h3>
            <div class="impact-row">
              <div class="impact-tag impact-tag-before">Before</div>
              <p class="body-text">
                <EditableText
                  :content-key="`impact.${i.key}.before`"
                  :default="i.before"
                  multiline
                  tag="span"
                />
              </p>
            </div>
            <div class="impact-divider" />
            <div class="impact-row">
              <div class="impact-tag impact-tag-after">With solar</div>
              <p class="body-text impact-after-text">
                <EditableText
                  :content-key="`impact.${i.key}.after`"
                  :default="i.after"
                  multiline
                  tag="span"
                />
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="section team-section">
      <div class="container">
        <div class="section-head">
          <div class="eyebrow">
            <EditableText content-key="team.eyebrow" default="The team" />
          </div>
          <h2 class="display-title smaller">
            <EditableText
              content-key="team.title"
              default="The people behind the mission."
              tag="span"
              multiline
            />
          </h2>
          <p class="lead">
            <EditableText
              content-key="team.lead"
              default="Meet the dedicated team leading our work to energize the Philippines."
              tag="span"
              multiline
            />
          </p>
        </div>

        <div class="team-grid">
          <article v-for="m in team" :key="m.key" class="team-card">
            <div class="team-photo">
              <img :src="m.img" :alt="m.name" />
            </div>
            <div class="team-body">
              <h3 class="team-name">
                <EditableText :content-key="`team.${m.key}.name`" :default="m.name" />
              </h3>
              <p class="team-role">
                <EditableText :content-key="`team.${m.key}.role`" :default="m.role" />
              </p>
              <p class="team-bio body-text">
                <EditableText
                  :content-key="`team.${m.key}.bio`"
                  :default="m.bio"
                  multiline
                  tag="span"
                />
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="/img/logoRa.jpeg" alt="" />
              <span class="footer-name">
                <EditableText content-key="footer.brand" default="Ra Unlimited" />
              </span>
            </div>
            <p class="footer-tagline">
              <EditableText
                content-key="footer.tagline"
                default="Powering the Philippines' renewable energy future through community-led solar projects."
                tag="span"
                multiline
              />
            </p>
            <div class="socials">
              <a href="#" aria-label="Facebook"><i class="mdi mdi-facebook" /></a>
              <a href="#" aria-label="Instagram"><i class="mdi mdi-instagram" /></a>
              <a href="https://www.linkedin.com/company/raunlimited/posts/?feedView=all" target="_blank" aria-label="LinkedIn">
                <i class="mdi mdi-linkedin" />
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">
              <EditableText content-key="footer.contact.heading" default="Contact" />
            </h4>
            <p class="footer-line">
              <EditableText
                content-key="footer.contact.address"
                :default="'123 Renewable Energy Boulevard\nMakati City, Metro Manila 1226\nPhilippines'"
                multiline
                tag="span"
              />
            </p>
            <p class="footer-line">
              <EditableText content-key="footer.contact.phone" default="+1 831 224 5335" />
            </p>
            <p class="footer-line">
              <EditableText content-key="footer.contact.email" default="info@raunlimited.com" />
            </p>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">
              <EditableText content-key="footer.links.heading" default="Explore" />
            </h4>
            <router-link to="/services" class="footer-link">Services</router-link>
            <router-link to="/solar-solutions" class="footer-link">Solar solutions</router-link>
            <router-link to="/quote" class="footer-link">Get a quote</router-link>
            <router-link to="/support" class="footer-link">Support</router-link>
          </div>
        </div>

        <div class="footer-bottom">
          <span>
            <EditableText
              content-key="footer.copy"
              default="© 2026 Ra Unlimited. All rights reserved."
            />
          </span>
          <div class="footer-legal">
            <router-link to="/privacy-policy">Privacy policy</router-link>
            <router-link to="/terms-of-service">Terms of service</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.about { color: var(--color-ink); }
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

.section-head {
  max-width: 760px;
  margin-bottom: 64px;
}
.display-title.smaller {
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  color: var(--color-moss);
  white-space: pre-line;
  margin-bottom: 24px;
}
.eyebrow { margin-bottom: 16px; }

/* SPLIT: MISSION + GOALS */
.split { background: var(--color-cream); }
.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 96px;
}
.split-col { display: flex; flex-direction: column; gap: 24px; }
.split-col .lead { max-width: 480px; }
.quote {
  font-style: italic;
  color: var(--color-terracotta);
  font-size: 1.4rem;
  line-height: 1.4;
  margin-top: 8px;
  border-left: 2px solid var(--color-terracotta);
  padding-left: 20px;
}
.goal { display: flex; gap: 24px; padding: 20px 0; border-bottom: 1px solid rgba(58, 79, 58, 0.12); }
.goal:last-child { border-bottom: none; }
.goal-num {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-terracotta);
  flex-shrink: 0;
  width: 40px;
}
.goal-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  font-weight: 500;
}

/* CTA QUOTE */
.cta-quote-band {
  background: var(--color-moss);
  color: var(--color-cream);
}
.cta-quote {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 64px;
  align-items: center;
}
.cta-quote .display-title.smaller { color: #fff; }
.cta-quote .lead { color: rgba(245, 240, 230, 0.85); margin-bottom: 24px; }
.cta-chips { display: flex; gap: 12px; flex-wrap: wrap; }
.chip {
  background: rgba(245, 240, 230, 0.1);
  border: 1px solid rgba(245, 240, 230, 0.2);
  color: var(--color-cream);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
}
.cta-quote-side { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
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
  transition: transform 0.15s, background 0.15s;
}
.cta-btn:hover { background: #ffce85; transform: translateY(-1px); }
.cta-btn-arrow { transition: transform 0.2s; }
.cta-btn:hover .cta-btn-arrow { transform: translateX(4px); }
.micro { font-size: 13px; color: rgba(245, 240, 230, 0.6); margin: 0; }

/* CHALLENGE */
.challenge-section { background: var(--color-cream-soft); }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat-card {
  background: #fff;
  padding: 32px 24px;
  border-radius: 20px;
  border: 1px solid rgba(58, 79, 58, 0.08);
}
.stat-num {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--color-terracotta);
  line-height: 1;
  margin-bottom: 12px;
}
.stat-label {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-moss);
  margin-bottom: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.stat-desc { font-size: 14px; color: var(--color-ink-soft); line-height: 1.5; }

/* IMPACT BEFORE/AFTER */
.impact-section { background: var(--color-cream); }
.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.impact-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.impact-card-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0 0 8px;
}
.impact-row { display: flex; flex-direction: column; gap: 8px; }
.impact-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  align-self: flex-start;
}
.impact-tag-before { background: rgba(42, 42, 36, 0.06); color: var(--color-ink-soft); }
.impact-tag-after { background: rgba(58, 79, 58, 0.12); color: var(--color-moss); }
.impact-divider {
  height: 1px;
  background: rgba(58, 79, 58, 0.08);
  margin: 8px 0;
}
.impact-after-text { color: var(--color-moss); }

/* TEAM */
.team-section { background: var(--color-cream-soft); }
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.team-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(58, 79, 58, 0.08);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  transition: transform 0.25s, box-shadow 0.25s;
}
.team-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lift); }
.team-photo { background: var(--color-cream-deep); }
.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 320px;
}
.team-body { padding: 32px; display: flex; flex-direction: column; gap: 8px; }
.team-name {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--color-moss);
  letter-spacing: -0.01em;
  margin: 0;
}
.team-role {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin: 0 0 12px;
}
.team-bio { margin: 0; }

/* FOOTER */
.footer-section {
  background: var(--color-moss-deep);
  color: var(--color-cream);
  padding: 80px 0 32px;
  margin-top: 0;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.1);
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.footer-logo img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}
.footer-name {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  letter-spacing: -0.01em;
}
.footer-tagline {
  color: rgba(245, 240, 230, 0.65);
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 24px;
}
.socials { display: flex; gap: 12px; }
.socials a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(245, 240, 230, 0.2);
  color: var(--color-cream);
  display: grid;
  place-items: center;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}
.socials a:hover {
  background: var(--color-sun);
  color: var(--color-moss-deep);
  border-color: var(--color-sun);
}
.socials .mdi { font-size: 18px; }
.footer-heading {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sun);
  margin: 0 0 20px;
}
.footer-line {
  color: rgba(245, 240, 230, 0.7);
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
}
.footer-link {
  display: block;
  color: rgba(245, 240, 230, 0.7);
  text-decoration: none;
  font-size: 14px;
  padding: 6px 0;
  transition: color 0.15s;
}
.footer-link:hover { color: var(--color-sun); }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  font-size: 13px;
  color: rgba(245, 240, 230, 0.5);
  gap: 24px;
  flex-wrap: wrap;
}
.footer-legal { display: flex; gap: 24px; }
.footer-legal a { color: rgba(245, 240, 230, 0.5); text-decoration: none; }
.footer-legal a:hover { color: var(--color-sun); }

/* RESPONSIVE */
@media (max-width: 960px) {
  .split-grid { grid-template-columns: 1fr; gap: 48px; }
  .cta-quote { grid-template-columns: 1fr; gap: 32px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .team-card { grid-template-columns: 1fr; }
  .team-photo img { aspect-ratio: 4 / 3; min-height: 0; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .container { padding: 0 24px; }
}
@media (max-width: 600px) {
  .stats-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; }
}
</style>
