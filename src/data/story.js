// Trilingual dictionary for the entire scrollytelling experience.
// Each entry has { en, tl, ceb }. Keep texts inline-editable later via EditableText if needed.

export const dict = {
  // Brand
  'brand.name': { en: 'Ra Unlimited', tl: 'Ra Unlimited', ceb: 'Ra Unlimited' },
  'brand.tagline': {
    en: 'Energy independence for the Philippines',
    tl: 'Kasarinlan sa enerhiya para sa Pilipinas',
    ceb: 'Kagawasan sa enerhiya para sa Pilipinas',
  },

  // Navigation
  'nav.story': { en: 'The Story', tl: 'Ang Kwento', ceb: 'Ang Sugilanon' },
  'nav.partner': { en: 'Invest With Us', tl: 'Mamuhunan sa Amin', ceb: 'Puhunan Kanamo' },
  'nav.lang.toggle': { en: 'TL', tl: 'EN', ceb: 'EN' },

  // Progress dots
  'progress.act1': { en: 'The problem', tl: 'Ang Suliranin', ceb: 'Ang Problema' },
  'progress.act2': { en: 'Our vision', tl: 'Ang Pananaw', ceb: 'Ang Panan-aw' },
  'progress.act3': { en: 'The typhoon', tl: 'Ang Bagyo', ceb: 'Ang Bagyo' },
  'progress.act4': { en: 'Resilience', tl: 'Katatagan', ceb: 'Kalig-on' },
  'progress.act5': { en: 'Invest', tl: 'Mamuhunan', ceb: 'Puhunan' },

  // Act 1 — The Problem
  'act1.eyebrow': { en: 'Act I · The Problem', tl: 'Yugto I · Ang Suliranin', ceb: 'Yugto I · Ang Problema' },
  'act1.title': {
    en: 'When the lights go out,\neverything stops.',
    tl: 'Kapag nag-blackout,\ntumitigil ang lahat.',
    ceb: 'Kung mawala ang suga,\nmaundang ang tanan.',
  },
  'act1.body': {
    en: 'Millions in rural Philippines live without reliable energy. Children study by candlelight. Clinics close at sunset. Families spend hard-earned pesos on diesel, batteries and kerosene.',
    tl: 'Milyun-milyon sa rural na Pilipinas ay walang maaasahang kuryente. Nag-aaral ang mga bata sa liwanag ng kandila. Sarado ang mga klinika pagsapit ng dilim. Ginagastos ng mga pamilya ang pinaghirapang pera sa diesel, baterya at gaas.',
    ceb: 'Minilyon sa rural nga Pilipinas nagpuyo nga walay kasaligang kuryente. Ang mga bata nagtuon sa kahayag sa kandila. Ang mga klinika magsira inigsalop sa adlaw. Ang mga pamilya mogasto sa ilang gihaguang kwarta sa diesel, baterya ug gaas.',
  },
  'act1.cue': { en: 'Scroll to begin', tl: 'Mag-scroll para magsimula', ceb: 'I-scroll para magsugod' },

  // Act 2 — Our Vision (first community we aim to build)
  'act2.eyebrow': { en: 'Act II · Our Vision', tl: 'Yugto II · Ang Aming Pananaw', ceb: 'Yugto II · Ang Among Panan-aw' },
  'act2.title': {
    en: 'We will build more than microgrids.\nWe will build communities\nthat own their future.',
    tl: 'Higit pa sa microgrids\nang aming itatayo.\nKomunidad na magmamay-ari\nng kanilang kinabukasan.',
    ceb: 'Labaw pa sa microgrids\nang among tukoron.\nKomunidad nga tag-iya\nsa ilang kaugmaon.',
  },
  'act2.body': {
    en: 'House by house, panel by panel, RA Unlimited will bring power that belongs to the people who use it. Schools, clinics, water systems and small businesses — all connected to a single, locally-owned solar microgrid. This is the first community we are raising investment to build.',
    tl: 'Tahanan-tahanan, panel-panel, dadalhin ng RA Unlimited ang kuryenteng pag-aari ng mga gumagamit nito. Mga paaralan, klinika, sistema ng tubig at maliliit na negosyo — konektado sa isang solar microgrid na pag-aari ng lokal na komunidad. Ito ang unang komunidad na nais naming itayo sa tulong ng inyong pamumuhunan.',
    ceb: 'Balay-balay, panel-panel, dad-on sa RA Unlimited ang kuryente nga gipanag-iya sa mga tawo nga naggamit niini. Mga eskwelahan, klinika, sistema sa tubig ug gagmay nga negosyo — konektado sa usa ka solar microgrid nga gipanag-iya sa lokal nga komunidad. Kini ang unang komunidad nga among tukoron pinaagi sa inyong puhunan.',
  },
  'act2.counter1.label': { en: 'Target: population', tl: 'Target: populasyon', ceb: 'Target: populasyon' },
  'act2.counter2.label': { en: 'Target: families', tl: 'Target: mga pamilya', ceb: 'Target: mga pamilya' },
  'act2.counter3.label': { en: 'Target: installed capacity', tl: 'Target: naka-instala', ceb: 'Target: installed nga kapasidad' },
  'act2.counter4.label': { en: 'Target: CO₂ avoided / year', tl: 'Target: CO₂ naiwasan / taon', ceb: 'Target: CO₂ malikayan / tuig' },

  // Projection notes (shown above counters)
  'act2.projection': {
    en: 'Investment target — first community',
    tl: 'Target ng pamumuhunan — unang komunidad',
    ceb: 'Target sa puhunan — unang komunidad',
  },
  'act4.projection': {
    en: 'Design specifications',
    tl: 'Mga espesipikasyon ng disenyo',
    ceb: 'Mga espesipikasyon sa disenyo',
  },
  'act5.projection': {
    en: 'Projected outcomes — with your investment',
    tl: 'Mga inaasahang resulta — sa tulong ng inyong pamumuhunan',
    ceb: 'Gipaabot nga resulta — pinaagi sa inyong puhunan',
  },

  // Act 3 — Typhoon
  'act3.eyebrow': { en: 'Act III · The Typhoon Arrives', tl: 'Yugto III · Dumarating ang Bagyo', ceb: 'Yugto III · Miabot ang Bagyo' },
  'act3.title': {
    en: 'Every year, super typhoons\nthreaten everything.',
    tl: 'Bawat taon,\nbumabanta ang super typhoon.',
    ceb: 'Kada tuig,\nang Super Bagyo\nnagahulga sa tanan.',
  },
  'act3.body': {
    en: 'For most rural communities, a single storm means weeks without power. Food spoils. Hospitals dim. Children miss school. The grid is fragile — and it fails first where it is needed most.',
    tl: 'Para sa karamihan ng rural na komunidad, ang isang bagyo ay linggo nang walang kuryente. Nasisira ang pagkain. Nagdidilim ang mga ospital. Hindi nakakapasok ang mga bata. Marupok ang grid — at unang bumibigay kung saan pinakakailangan.',
    ceb: 'Para sa kadaghanan sa rural nga komunidad, ang usa ka bagyo nagpasabot ug mga semana nga walay kuryente. Madaot ang pagkaon. Magngitngit ang mga ospital. Dili maka-eskwela ang mga bata. Mahuyang ang grid — ug una kining madaot kung asa kini gikinahanglan.',
  },
  'act3.warning': { en: 'Super Typhoon · Signal #5', tl: 'Super Bagyo · Signal #5', ceb: 'Super Bagyo · Signal #5' },

  // Act 4 — Engineered to Endure (how our design will perform)
  'act4.eyebrow': { en: 'Act IV · Engineered to Endure', tl: 'Yugto IV · Dinisenyo Para Manatili', ceb: 'Yugto IV · Gidesinyo Para Molungtad' },
  'act4.title': {
    en: 'While the grid fails,\nour communities will stay lit.',
    tl: 'Habang bumabagsak ang grid,\nmananatiling may liwanag\nang aming mga komunidad.',
    ceb: 'Samtang maguba ang grid,\nang among mga komunidad\nmagpabiling hayag.',
  },
  'act4.body': {
    en: "Every microgrid we design will be engineered for the Philippines — typhoon-rated mounts, sealed batteries, redundant inverters. When everything else goes dark, the lights, the fridges and the medical equipment will keep running. This is the resilience we are building into every system.",
    tl: 'Ang bawat microgrid na aming idinisenyo ay itatayo para sa Pilipinas — mga base na lumalaban sa bagyo, naka-seal na baterya, redundant na inverters. Kapag bumagsak ang lahat, mananatiling bukas ang ilaw, ang ref, at ang gamit medikal. Ito ang katatagan na aming itinatayo sa bawat sistema.',
    ceb: 'Ang matag microgrid nga among gidesinyo tukoron para sa Pilipinas — mga mounting nga makasugakod sa bagyo, selyadong baterya, redundant nga inverters. Kung mawala ang tanan, ang mga suga, ref, ug kagamitang medikal magpadayon. Kini ang kalig-on nga among gitukod sa matag sistema.',
  },
  'act4.counter1.label': { en: 'Target: uptime during typhoon', tl: 'Target: uptime habang bagyo', ceb: 'Target: uptime panahon sa bagyo' },
  'act4.counter2.label': { en: 'Target: hospitals & schools lit', tl: 'Target: ospital at paaralang may ilaw', ceb: 'Target: mga ospital ug eskwelahan nga hayag' },
  'act4.counter3.label': { en: 'Recovery vs traditional grid', tl: 'Pagbawi vs tradisyonal', ceb: 'Pagbawi vs tradisyonal nga grid' },
  'act4.counter3.value': { en: '0h vs 72h', tl: '0h kumpara 72h', ceb: '0h kumpara 72h' },

  // Act 5 — Invest in Tomorrow (call to action for investors)
  'act5.eyebrow': { en: 'Act V · Invest in Tomorrow', tl: 'Yugto V · Mamuhunan sa Bukas', ceb: 'Yugto V · Puhunan sa Ugma' },
  'act5.title': {
    en: 'Self-sustaining. Resilient.\nOwned by the people.\nThis is the future we are building.',
    tl: 'Napapanatili. Matibay.\nPag-aari ng mga tao.\nIto ang kinabukasang aming itinatayo.',
    ceb: 'Malungtaron. Lig-on.\nGipanag-iya sa katawhan.\nKini ang kaugmaon nga among gitukod.',
  },
  'act5.body': {
    en: 'This is what energy independence will look like — not a promise from far away, but light, water and possibility built by the community itself. With your investment, the first RA Unlimited microgrid will power a village that can choose its own future. And that village will be the first of many.',
    tl: 'Ito ang magiging hitsura ng kasarinlan sa enerhiya — hindi pangako mula sa malayo, kundi ilaw, tubig at posibilidad na itinayo mismo ng komunidad. Sa tulong ng inyong pamumuhunan, ang unang RA Unlimited microgrid ay magbibigay-liwanag sa isang nayon na makakapili ng sariling kinabukasan. At ang nayong iyon ang magiging una sa marami.',
    ceb: 'Kini ang mahitabo nga hitsura sa kagawasan sa enerhiya — dili saad gikan sa layo, kundili kahayag, tubig ug posibilidad nga gitukod mismo sa komunidad. Pinaagi sa inyong puhunan, ang unang RA Unlimited microgrid maghatag ug kahayag sa usa ka baryo nga makapili sa ilang kaugmaon. Ug kana nga baryo mao ang una sa daghan.',
  },
  'act5.counter1.label': { en: 'Projected: quality of life', tl: 'Inaasahan: kalidad ng buhay', ceb: 'Gipaabot: kalidad sa kinabuhi' },
  'act5.counter2.label': { en: 'Projected: children studying at night', tl: 'Inaasahan: batang mag-aaral sa gabi', ceb: 'Gipaabot: mga bata nga magtuon sa gabii' },
  'act5.counter3.label': { en: 'Projected: new local businesses', tl: 'Inaasahan: bagong negosyo', ceb: 'Gipaabot: bag-ong lokal nga negosyo' },
  'act5.counter4.label': { en: 'Projected: savings / family / mo.', tl: 'Inaasahan: tipid / pamilya / buwan', ceb: 'Gipaabot: matigom / pamilya / bulan' },
  'act5.cta': { en: 'Invest With Us', tl: 'Mamuhunan sa Amin', ceb: 'Puhunan Kanamo' },
  'act5.cta.sub': { en: 'Help us build the first village.', tl: 'Tulungan kaming itayo ang unang nayon.', ceb: 'Tabangi kami sa pagtukod sa unang baryo.' },

  // Partner / Investor modal
  'partner.title': { en: 'Invest in Ra Unlimited', tl: 'Mamuhunan sa Ra Unlimited', ceb: 'Puhunan sa Ra Unlimited' },
  'partner.subtitle': {
    en: 'Tell us about your organization, fund or project. We respond within 48 hours.',
    tl: 'Sabihin sa amin ang tungkol sa inyong organisasyon, pondo o proyekto. Sumasagot kami sa loob ng 48 oras.',
    ceb: 'Sultihi kami bahin sa inyong organisasyon, pondo o proyekto. Motubag kami sa sulod sa 48 oras.',
  },
  'partner.name': { en: 'Your name', tl: 'Pangalan', ceb: 'Imong pangalan' },
  'partner.org': { en: 'Organization / community', tl: 'Organisasyon / komunidad', ceb: 'Organisasyon / komunidad' },
  'partner.email': { en: 'Email', tl: 'Email', ceb: 'Email' },
  'partner.phone': { en: 'Phone', tl: 'Telepono', ceb: 'Telepono' },
  'partner.location': { en: 'Location', tl: 'Lokasyon', ceb: 'Lokasyon' },
  'partner.message': { en: 'How can we help?', tl: 'Paano namin matutulungan?', ceb: 'Unsaon ka namo pagtabang?' },
  'partner.submit': { en: 'Send message', tl: 'Ipadala ang mensahe', ceb: 'Ipadala ang mensahe' },
  'partner.sending': { en: 'Sending…', tl: 'Ipinapadala…', ceb: 'Gipadala…' },
  'partner.thanks.title': { en: 'Message received.', tl: 'Natanggap na.', ceb: 'Nadawat na.' },
  'partner.thanks.body': {
    en: "We'll be in touch within 48 hours.",
    tl: 'Makikipag-ugnayan kami sa loob ng 48 oras.',
    ceb: 'Makigkontak kami sa sulod sa 48 oras.',
  },
  'partner.close': { en: 'Close', tl: 'Isara', ceb: 'Isara' },
}

// Numerical counters by act (value is the same in all languages)
// These are PROJECTED values for the first sustainable community —
// RA Unlimited is seeking investment to make these numbers real.
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
