import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
]

const BASE_URL = '/monitoring'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

export default router
