import { ref } from 'vue'
import { courseCatalogContainer } from '../../course-catalog.container'
import { CreateCourseCommand } from '../../application/use-case/create-course/CreateCourseCommand'
import type { CreateCourseResponse } from '../../application/use-case/create-course/CreateCourseResponse'

export interface CreateCourseFormData {
  title: string
  description: string
  instructorId: string
  priceAmount: number
  priceCurrency: string
  level: string
  durationMinutes: number
}

/**
 * Única capa que conoce `ref`/reactividad de Vue en todo el flujo de
 * "crear curso". Traduce el formulario a un CreateCourseCommand, delega en
 * el Handler (TypeScript puro) y expone el estado como refs para la vista.
 */
export function useCreateCourse() {
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)
  const result = ref<CreateCourseResponse | null>(null)

  async function submit(form: CreateCourseFormData) {
    isSubmitting.value = true
    error.value = null

    const command = new CreateCourseCommand(
      form.title,
      form.description,
      form.instructorId,
      form.priceAmount,
      form.priceCurrency,
      form.level,
      form.durationMinutes,
    )

    try {
      result.value = await courseCatalogContainer.createCourseHandler.handle(command)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unexpected error creating the course.'
    } finally {
      isSubmitting.value = false
    }
  }

  return { isSubmitting, error, result, submit }
}
