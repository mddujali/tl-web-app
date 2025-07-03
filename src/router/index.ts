import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { layout: 'guest' },
  },
  {
    path: '/ip-management',
    name: 'ipManagement',
    component: () => import('@/views/IpManagementPage.vue'),
    meta: { layout: 'app' },
  },
  {
    path: '/audit-logs',
    name: 'auditLogs',
    component: () => import('@/views/AuditLogsPage.vue'),
    meta: { layout: 'app' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
})

export default router
