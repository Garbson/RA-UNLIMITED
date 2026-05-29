import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

// Light & Earth palette — humanitarian, organic
const lightAndEarth = {
  dark: false,
  colors: {
    background: '#F5F0E6', // cream
    surface: '#FFFFFF',
    'surface-variant': '#EFE7D6',
    'on-surface-variant': '#3A4F3A',
    primary: '#3A4F3A', // moss green
    'on-primary': '#F5F0E6',
    secondary: '#C7522A', // terracotta
    'on-secondary': '#FFFFFF',
    accent: '#F4B860', // warm sun
    'on-accent': '#2A2A24',
    info: '#5B7C99',
    success: '#5C7A4A',
    warning: '#E0A458',
    error: '#B33A3A',
    'on-background': '#2A2A24',
    'on-surface': '#2A2A24',
    'grey-lighten-5': '#FBF8F2',
    'grey-lighten-4': '#F2EBDD',
    'grey-lighten-3': '#E6DDC9',
    'grey-lighten-2': '#CFC4AC',
    'grey-darken-1': '#6B6B5E',
    'grey-darken-3': '#3A3A33',
  },
  variables: {
    'border-color': '#3A4F3A',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.95,
    'medium-emphasis-opacity': 0.7,
  },
}

export default createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  defaults: {
    VBtn: { rounded: 'pill', style: 'text-transform: none; letter-spacing: 0;' },
    VCard: { rounded: 'lg' },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VTextarea: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary' },
  },
  theme: {
    defaultTheme: 'lightAndEarth',
    themes: { lightAndEarth },
  },
})
