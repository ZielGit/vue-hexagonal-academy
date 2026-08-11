import type { RouteRecordRaw } from 'vue-router'

/**
 * Rutas del módulo, registradas en router/index.ts. Cualquier rol
 * autenticado puede ver el catálogo; crear/publicar queda restringido
 * a Instructor/Admin vía `meta.roles`, resuelto por authGuard.
 */
export const courseCatalogRoutes: RouteRecordRaw[] = [
  {
    path: '/courses',
    name: 'course-list',
    component: () => import('./presentation/views/CourseListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/courses/new',
    name: 'course-create',
    component: () => import('./presentation/views/CreateCourseView.vue'),
    meta: { requiresAuth: true, roles: ['Instructor', 'Admin'] },
  },
]
