import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/aboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import SolarSolutionsView from '../views/SolarSolutionsView.vue'
import QuoteView from '../views/QuoteView.vue'
import SupportView from '../views/SupportView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/solar-solutions', name: 'solar-solutions', component: SolarSolutionsView },
    { path: '/quote', name: 'quote', component: QuoteView },
    { path: '/support', name: 'support', component: SupportView },
    { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
    { path: '/terms-of-service', name: 'terms-of-service', component: TermsOfServiceView },
    { path: '/login', name: 'login', component: LoginView, meta: { bare: true } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
