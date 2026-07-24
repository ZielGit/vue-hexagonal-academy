import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export type UserRole = 'Student' | 'Instructor' | 'Admin'

/**
 * Guard reusable de Vue Router.
 * - Si la ruta requiere auth y no hay sesión -> redirige a /login.
 * - Si la ruta declara `meta.roles` y el rol del usuario no calza -> 403.
 */
export function authGuard(to: RouteLocationNormalized) {
  const auth = useAuthStore()
  const requiresAuth = to.meta.requiresAuth === true
  const allowedRoles = to.meta.roles as UserRole[] | undefined

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (allowedRoles && auth.user && !allowedRoles.includes(auth.user.role)) {
    return { name: 'forbidden' }
  }

  return true
}
