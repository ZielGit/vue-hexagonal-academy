import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

/**
 * Cliente Axios base compartido por todos los módulos.
 * Los adapters de infraestructura de cada módulo (ej. CourseApiClient)
 * lo consumen — nunca lo llama directamente la capa de presentación.
 */
export function createHttpClient(): AxiosInstance {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
    headers: { Accept: 'application/json' },
  })

  // Interceptor de request: adjunta el JWT/Sanctum token si existe sesión.
  client.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  })

  // Interceptor de response: si el backend responde 401, cierra sesión local
  // y deja que el guard de router redirija a login en la siguiente navegación.
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const auth = useAuthStore()
        auth.clearSession()
      }
      return Promise.reject(error)
    },
  )

  return client
}

export const httpClient = createHttpClient()
