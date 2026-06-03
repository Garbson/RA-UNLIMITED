// Color palettes per mood. Hex strings + intensities.
export const palettes = {
  poverty: {
    // Soft muted day sky, dimmer lighting representing initial state
    sky: '#8ab3df',
    fog: '#afcfee',
    sun: '#fff4d0',
    sunIntensity: 1.1,
    ambient: '#e8f0fa',
    ambientIntensity: 0.95,
    ground: '#6aaa3b',
    leaves: '#5a8b3a',
    wall: '#c79872',
    wallDecay: '#a07c5a',
    roof: '#8b4520',
    roofDecay: '#6a361a',
    window: '#ffd382',
    windowEmissive: 1.0,
    panel: '#1e3a5f',
    panelEmissive: 0.4,
    panelOpacity: 1,
  },
  awakening: {
    // Brighter morning sky as energy starts to awaken the village
    sky: '#6fa2e0',
    fog: '#92c3fa',
    sun: '#ffd49a',
    sunIntensity: 1.4,
    ambient: '#b0c8e0',
    ambientIntensity: 1.2,
    ground: '#6e8c44',
    leaves: '#7daf45',
    wall: '#c79872',
    wallDecay: '#a07c5a',
    roof: '#8b4520',
    roofDecay: '#6a361a',
    window: '#ffd382',
    windowEmissive: 3.2,
    panel: '#1e3a5f',
    panelEmissive: 0.6,
    panelOpacity: 1,
  },
  prosperous: {
    // Vibrant bright blue sky showing the fully powered, prosperous village
    sky: '#5ab0ff',
    fog: '#8fc8ff',
    sun: '#ffe2a8',
    sunIntensity: 1.7,
    ambient: '#cae0f5',
    ambientIntensity: 1.4,
    ground: '#7eb050',
    leaves: '#9bcf5a',
    wall: '#f0c896',
    wallDecay: '#d0a878',
    roof: '#b04830',
    roofDecay: '#8e3a26',
    window: '#fff0c0',
    windowEmissive: 2.0,
    panel: '#2b4e7e',
    panelEmissive: 0.9,
    panelOpacity: 1,
  },
  // Legacy moods kept around for compatibility
  storm: {
    sky: '#231830',
    fog: '#2a1f3a',
    sun: '#6a5070',
    sunIntensity: 0.7,
    ambient: '#5a4060',
    ambientIntensity: 0.8,
    ground: '#3a4b28',
    leaves: '#506a3a',
    wall: '#a07c5e',
    wallDecay: '#8a6850',
    roof: '#5a2a18',
    roofDecay: '#3e1c10',
    window: '#ffd382',
    windowEmissive: 3.5,
    panel: '#1a2638',
    panelEmissive: 0.1,
    panelOpacity: 1,
  },
  dawn: {
    sky: '#ffbe7d',
    fog: '#ffd4a3',
    sun: '#ff8a50',
    sunIntensity: 1.4,
    ambient: '#ffdac0',
    ambientIntensity: 1.1,
    ground: '#5a7c3a',
    leaves: '#7daf45',
    wall: '#e9bc8c',
    wallDecay: '#cba074',
    roof: '#b04830',
    roofDecay: '#8e3a26',
    window: '#fff0c0',
    windowEmissive: 0.5,
    panel: '#2b4e7e',
    panelEmissive: 0.45,
    panelOpacity: 1,
  },
  day: {
    sky: '#fae9c8',
    fog: '#fde7c2',
    sun: '#ffd28a',
    sunIntensity: 1.6,
    ambient: '#fff4dc',
    ambientIntensity: 1.2,
    ground: '#6d9744',
    leaves: '#86c050',
    wall: '#f0c896',
    wallDecay: '#d6a878',
    roof: '#c2533a',
    roofDecay: '#9e3f2a',
    window: '#fff8e0',
    windowEmissive: 0.0,
    panel: '#2e5b94',
    panelEmissive: 0.6,
    panelOpacity: 1,
  },
  dark: {
    sky: '#152647',
    fog: '#1c2c54',
    sun: '#8aa8d8',
    sunIntensity: 0.85,
    ambient: '#4b6090',
    ambientIntensity: 0.95,
    ground: '#2c3f24',
    leaves: '#3f5f3f',
    wall: '#6e5a44',
    wallDecay: '#4e3e30',
    roof: '#3a261a',
    roofDecay: '#22160e',
    window: '#1a2238',
    windowEmissive: 0,
    panel: '#1a2638',
    panelEmissive: 0,
    panelOpacity: 1,
  },
  built: {
    sky: '#1a3050',
    fog: '#2a3f64',
    sun: '#ffcf85',
    sunIntensity: 1.1,
    ambient: '#5a72a0',
    ambientIntensity: 1.0,
    ground: '#5a7e3a',
    leaves: '#6d9f50',
    wall: '#d6a075',
    wallDecay: '#a07c5a',
    roof: '#8b4520',
    roofDecay: '#6a361a',
    window: '#ffd382',
    windowEmissive: 2.4,
    panel: '#1e3a5f',
    panelEmissive: 0.3,
    panelOpacity: 1,
  },
}

export function lerpColor(a, b, t) {
  const ah = parseInt(a.replace('#', ''), 16)
  const bh = parseInt(b.replace('#', ''), 16)
  const ar = (ah >> 16) & 0xff
  const ag = (ah >> 8) & 0xff
  const ab = ah & 0xff
  const br = (bh >> 16) & 0xff
  const bg = (bh >> 8) & 0xff
  const bb = bh & 0xff
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const c = Math.round(ab + (bb - ab) * t)
  return '#' + ((r << 16) | (g << 8) | c).toString(16).padStart(6, '0')
}

export function lerpPalette(a, b, t) {
  const out = {}
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const k of keys) {
    const av = a[k]
    const bv = b[k] !== undefined ? b[k] : av
    if (av === undefined) {
      out[k] = bv
      continue
    }
    if (typeof av === 'number') out[k] = av + (bv - av) * t
    else out[k] = lerpColor(av, bv, t)
  }
  return out
}
