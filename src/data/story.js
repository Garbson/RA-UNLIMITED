// Bilingual dictionary for the entire scrollytelling experience.
// Each entry has { en, tl }. Keep texts inline-editable later via EditableText if needed.

export const dict = {
  // Brand
  'brand.name': { en: 'Ra Unlimited', tl: 'Ra Unlimited' },
  'brand.tagline': {
    en: 'Energy independence for the Philippines',
    tl: 'Kasarinlan sa enerhiya para sa Pilipinas',
  },

  // Navigation
  'nav.story': { en: 'The Story', tl: 'Ang Kwento' },
  'nav.partner': { en: 'Partner With Us', tl: 'Makipagtulungan sa Amin' },
  'nav.lang.toggle': { en: 'TL', tl: 'EN' },

  // Progress dots
  'progress.act1': { en: 'The problem', tl: 'Ang Suliranin' },
  'progress.act2': { en: 'The community', tl: 'Ang Komunidad' },
  'progress.act3': { en: 'The typhoon', tl: 'Ang Bagyo' },
  'progress.act4': { en: 'Resilience', tl: 'Katatagan' },
  'progress.act5': { en: 'Tomorrow', tl: 'Bukas' },

  // Act 1 — The Problem
  'act1.eyebrow': { en: 'Act I · The Problem', tl: 'Yugto I · Ang Suliranin' },
  'act1.title': {
    en: 'When the lights go out,\neverything stops.',
    tl: 'Kapag nag-blackout,\ntumitigil ang lahat.',
  },
  'act1.body': {
    en: 'Millions in rural Philippines live without reliable energy. Children study by candlelight. Clinics close at sunset. Families spend hard-earned pesos on diesel, batteries and kerosene.',
    tl: 'Milyun-milyon sa rural na Pilipinas ay walang maaasahang kuryente. Nag-aaral ang mga bata sa liwanag ng kandila. Sarado ang mga klinika pagsapit ng dilim. Ginagastos ng mga pamilya ang pinaghirapang pera sa diesel, baterya at gaas.',
  },
  'act1.cue': { en: 'Scroll to begin', tl: 'Mag-scroll para magsimula' },

  // Act 2 — Community is born
  'act2.eyebrow': { en: 'Act II · A Community Comes to Life', tl: 'Yugto II · Nabubuhay ang Komunidad' },
  'act2.title': {
    en: 'We build more than microgrids.\nWe build communities\nthat own their future.',
    tl: 'Higit pa sa microgrids\nang itinatayo namin.\nKomunidad na nagmamay-ari\nng kanilang kinabukasan.',
  },
  'act2.body': {
    en: 'House by house, panel by panel, RA Unlimited brings power that belongs to the people who use it. Schools, clinics, water systems and small businesses — all connected to a single, locally-owned solar microgrid.',
    tl: 'Tahanan-tahanan, panel-panel, dinadala ng RA Unlimited ang kuryenteng pag-aari ng mga gumagamit nito. Mga paaralan, klinika, sistema ng tubig at maliliit na negosyo — konektado sa isang solar microgrid na pag-aari ng lokal na komunidad.',
  },
  'act2.counter1.label': { en: 'Population served', tl: 'Naseserbisyuhan' },
  'act2.counter2.label': { en: 'Families connected', tl: 'Mga pamilya' },
  'act2.counter3.label': { en: 'Installed capacity', tl: 'Naka-instala' },
  'act2.counter4.label': { en: 'CO₂ avoided / year', tl: 'CO₂ naiwasan kada taon' },

  // Act 3 — Typhoon
  'act3.eyebrow': { en: 'Act III · The Typhoon Arrives', tl: 'Yugto III · Dumarating ang Bagyo' },
  'act3.title': {
    en: 'Every year, super typhoons\nthreaten everything.',
    tl: 'Bawat taon,\nbumabanta ang super typhoon.',
  },
  'act3.body': {
    en: 'For most rural communities, a single storm means weeks without power. Food spoils. Hospitals dim. Children miss school. The grid is fragile — and it fails first where it is needed most.',
    tl: 'Para sa karamihan ng rural na komunidad, ang isang bagyo ay linggo nang walang kuryente. Nasisira ang pagkain. Nagdidilim ang mga ospital. Hindi nakakapasok ang mga bata. Marupok ang grid — at unang bumibigay kung saan pinakakailangan.',
  },
  'act3.warning': { en: 'Super Typhoon · Signal #5', tl: 'Super Bagyo · Signal #5' },

  // Act 4 — Resilience
  'act4.eyebrow': { en: 'Act IV · Resilience Holds', tl: 'Yugto IV · Tumibay ang Sistema' },
  'act4.title': {
    en: 'While the grid fails,\nRA communities stay lit.',
    tl: 'Habang bumabagsak ang grid,\nnananatiling may liwanag\nang RA communities.',
  },
  'act4.body': {
    en: "Our microgrids are engineered for the Philippines — typhoon-rated mounts, sealed batteries, redundant inverters. When everything else goes dark, the lights, the fridges and the medical equipment keep running.",
    tl: 'Ang aming microgrids ay dinisenyo para sa Pilipinas — mga base na lumalaban sa bagyo, naka-seal na baterya, redundant na inverters. Kapag bumagsak ang lahat, nananatiling bukas ang ilaw, ang ref, at ang gamit medikal.',
  },
  'act4.counter1.label': { en: 'System uptime during typhoon', tl: 'Uptime habang bagyo' },
  'act4.counter2.label': { en: 'Hospitals & schools kept lit', tl: 'Ospital at paaralan na may ilaw' },
  'act4.counter3.label': { en: 'Recovery vs traditional grid', tl: 'Pagbawi vs tradisyonal' },
  'act4.counter3.value': { en: '0h vs 72h', tl: '0h kumpara 72h' },

  // Act 5 — Tomorrow
  'act5.eyebrow': { en: 'Act V · This Is Tomorrow', tl: 'Yugto V · Ito ang Bukas' },
  'act5.title': {
    en: 'Self-sustaining. Resilient.\nOwned by the people.',
    tl: 'Napapanatili. Matibay.\nPag-aari ng mga tao.',
  },
  'act5.body': {
    en: 'This is what energy independence looks like — not a promise from far away, but light, water and possibility built by the community itself. Every microgrid we build is one more village that can choose its own future.',
    tl: 'Ito ang hitsura ng kasarinlan sa enerhiya — hindi pangako mula sa malayo, kundi ilaw, tubig at posibilidad na itinayo mismo ng komunidad. Bawat microgrid na itinatayo namin ay isa pang nayon na makakapili ng sariling kinabukasan.',
  },
  'act5.counter1.label': { en: 'Quality of life index', tl: 'Indeks ng kalidad ng buhay' },
  'act5.counter2.label': { en: 'Children studying at night', tl: 'Mga batang nag-aaral sa gabi' },
  'act5.counter3.label': { en: 'New local businesses', tl: 'Bagong negosyo sa lugar' },
  'act5.counter4.label': { en: 'Average savings / family / mo.', tl: 'Tipid kada pamilya / buwan' },
  'act5.cta': { en: 'Partner With Us', tl: 'Makipagtulungan sa Amin' },
  'act5.cta.sub': { en: 'Build the next village.', tl: 'Itayo ang susunod na nayon.' },

  // Partner modal
  'partner.title': { en: 'Partner with Ra Unlimited', tl: 'Makipagsosyo sa Ra Unlimited' },
  'partner.subtitle': {
    en: 'Tell us about your community, organization or project. We respond within 48 hours.',
    tl: 'Sabihin sa amin ang tungkol sa inyong komunidad, organisasyon o proyekto. Sumasagot kami sa loob ng 48 oras.',
  },
  'partner.name': { en: 'Your name', tl: 'Pangalan' },
  'partner.org': { en: 'Organization / community', tl: 'Organisasyon / komunidad' },
  'partner.email': { en: 'Email', tl: 'Email' },
  'partner.phone': { en: 'Phone', tl: 'Telepono' },
  'partner.location': { en: 'Location', tl: 'Lokasyon' },
  'partner.message': { en: 'How can we help?', tl: 'Paano namin matutulungan?' },
  'partner.submit': { en: 'Send message', tl: 'Ipadala ang mensahe' },
  'partner.sending': { en: 'Sending…', tl: 'Ipinapadala…' },
  'partner.thanks.title': { en: 'Message received.', tl: 'Natanggap na.' },
  'partner.thanks.body': {
    en: "We'll be in touch within 48 hours.",
    tl: 'Makikipag-ugnayan kami sa loob ng 48 oras.',
  },
  'partner.close': { en: 'Close', tl: 'Isara' },
}

// Numerical counters by act (value is the same in both languages)
export const counters = {
  act2: [
    { key: 'pop', icon: 'mdi-account-group', value: 2847, format: 'thousands' },
    { key: 'fam', icon: 'mdi-home-heart', value: 634, format: 'thousands' },
    { key: 'cap', icon: 'mdi-lightning-bolt', value: 850, suffix: ' kW', format: 'thousands' },
    { key: 'co2', icon: 'mdi-leaf', value: 1240, suffix: ' t', format: 'thousands' },
  ],
  act4: [
    { key: 'uptime', icon: 'mdi-shield-check', value: 99.7, decimals: 1, suffix: '%' },
    { key: 'hospitals', icon: 'mdi-hospital', value: 100, suffix: '%' },
    // counter3 uses translated string instead of numeric animation
  ],
  act5: [
    { key: 'qol', icon: 'mdi-trending-up', value: 340, prefix: '+', suffix: '%' },
    { key: 'kids', icon: 'mdi-school', value: 1200, format: 'thousands', suffix: '+' },
    { key: 'biz', icon: 'mdi-storefront', value: 47 },
    { key: 'save', icon: 'mdi-currency-php', value: 2400, format: 'thousands' },
  ],
}
