import { ref, shallowRef, onMounted } from 'vue'
import { courseCatalogContainer } from '../../course-catalog.container'
import type { Course } from '../../domain/model/Course'

export function useCourseList() {
  // shallowRef, no ref: Course es una entidad de dominio con campos
  // privados (encapsulados por diseño). El ref() profundo de Vue envuelve
  // el valor en un Proxy reactivo recursivo, lo que rompe tanto la
  // inferencia de tipos (ver README) como, en runtime, el acceso a campos
  // privados de la clase. shallowRef solo hace reactivo el array en sí,
  // no el interior de cada Course — que es exactamente lo que queremos:
  // reemplazamos la lista completa en cada `load()`, nunca mutamos un
  // Course en el sitio.
  const courses = shallowRef<Course[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    isLoading.value = true
    error.value = null
    try {
      courses.value = await courseCatalogContainer.courseRepository.findAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unexpected error loading courses.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)

  return { courses, isLoading, error, reload: load }
}
