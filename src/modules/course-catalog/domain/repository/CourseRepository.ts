import type { Course } from '../model/Course'
import type { CourseId } from '../value-object/CourseId'

/**
 * Mirror de Domain/Repository/CourseRepositoryInterface.php.
 * Puerto del hexágono: el dominio y la aplicación dependen SOLO de esta
 * interfaz. La implementación concreta (HttpCourseRepository) vive en
 * infrastructure/persistence/ y es inyectada en el módulo.
 */
export interface CourseRepository {
  save(course: Course): Promise<void>
  findById(id: CourseId): Promise<Course | null>
  findAll(): Promise<Course[]>
}
