import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import DashboardDetail from '@/views/DashboardDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/monitoring',
    component: DashboardView,
  },
  {
    path: '/monitoring/:detail',
    component: DashboardDetail,
  },
]

const BASE_URL = '/'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

export default router
