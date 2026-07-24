import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserRole } from '@/shared/infrastructure/auth/authGuard'

interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

/**
 * Store global de sesión. Guarda el JWT/Sanctum token y el usuario
 * autenticado. Es la única fuente de verdad que consultan tanto el
 * authGuard de router como el interceptor de Axios.
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => token.value !== null)

  function setSession(newToken: string, newUser: AuthUser) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('auth_token', newToken)
  }

  function clearSession() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  return { token, user, isAuthenticated, setSession, clearSession }
})
