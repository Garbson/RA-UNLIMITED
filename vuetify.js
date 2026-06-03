import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

const raTheme = {
  dark: false,
  colors: {
    background: '#FAF6EE',
    surface: '#FFFFFF',
    primary: '#F97316', // orange
    'on-primary': '#FFFFFF',
    secondary: '#EAB308', // yellow
    'on-secondary': '#1A1D24',
    accent: '#1E3A5F', // deep blue
    'on-accent': '#FFFFFF',
    info: '#1E3A5F',
    success: '#EAB308',
    warning: '#F97316',
    error: '#B22535',
    'on-background': '#1A1D24',
    'on-surface': '#1A1D24',
  },
}

export default createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  theme: { defaultTheme: 'raTheme', themes: { raTheme } },
})
