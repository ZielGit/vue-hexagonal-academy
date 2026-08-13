import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/shared/infrastructure/auth/authGuard'
import { courseCatalogRoutes } from '@/modules/course-catalog/course-catalog.routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/courses' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/shared/presentation/LoginView.vue'),
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('@/shared/presentation/ForbiddenView.vue'),
    },
    ...courseCatalogRoutes,
  ],
})

router.beforeEach(authGuard)

export default router
