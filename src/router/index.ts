import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { layout: 'guest' },
  },
  {
    path: '/',
    meta: { layout: 'app' },
    children: [
      {
        path: 'ip-management',
        name: 'ipManagement',
        component: () => import('@/views/IpManagementPage.vue'),
        meta: { layout: 'app' },
      },
      {
        path: 'audit-logs',
        name: 'auditLogs',
        component: () => import('@/views/AuditLogsPage.vue'),
        meta: { layout: 'app' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name === 'auditLogs' && userStore.role !== 'super-admin') {
    next({ name: 'ipManagement' })

    return
  }

  next()
})

export default router
