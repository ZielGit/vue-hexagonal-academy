import { ref } from 'vue'
import { courseCatalogContainer } from '../../course-catalog.container'
import { PublishCourseCommand } from '../../application/use-case/publish-course/PublishCourseCommand'

export function usePublishCourse() {
  const isPublishing = ref(false)
  const error = ref<string | null>(null)

  async function publish(courseId: string) {
    isPublishing.value = true
    error.value = null
    try {
      await courseCatalogContainer.publishCourseHandler.handle(new PublishCourseCommand(courseId))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unexpected error publishing the course.'
    } finally {
      isPublishing.value = false
    }
  }

  return { isPublishing, error, publish }
}
