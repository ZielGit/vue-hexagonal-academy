import { HttpCourseRepository } from './infrastructure/persistence/HttpCourseRepository'
import { CreateCourseHandler } from './application/use-case/create-course/CreateCourseHandler'
import { PublishCourseHandler } from './application/use-case/publish-course/PublishCourseHandler'

/**
 * Mirror de Infrastructure/Provider/CourseCatalogServiceProvider.php.
 *
 * Punto único de wiring del módulo: construye la implementación concreta
 * del puerto (HttpCourseRepository) y la inyecta en cada Handler. Los
 * composables de presentation/ consumen este objeto en vez de instanciar
 * Handlers por su cuenta — así el módulo entero es sustituible en tests
 * (basta con pasar un CourseRepository fake al construir los Handlers).
 */
function buildCourseCatalogContainer() {
  const courseRepository = new HttpCourseRepository()

  return {
    createCourseHandler: new CreateCourseHandler(courseRepository),
    publishCourseHandler: new PublishCourseHandler(courseRepository),
    courseRepository,
  }
}

export const courseCatalogContainer = buildCourseCatalogContainer()
