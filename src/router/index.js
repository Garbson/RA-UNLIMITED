import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import QuotesAdminView from '../views/QuotesAdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { bare: true } },
    { path: '/login', name: 'login', component: LoginView, meta: { bare: true } },
    { path: '/quotes', name: 'quotes', component: QuotesAdminView, meta: { bare: true } },
    // Catch-all → redirect to home (legacy routes no longer exist)
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
