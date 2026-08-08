import type { CourseRepository } from '../../domain/repository/CourseRepository'
import { Course } from '../../domain/model/Course'
import { CourseId } from '../../domain/value-object/CourseId'
import { CourseTitle } from '../../domain/value-object/CourseTitle'
import { CourseDescription } from '../../domain/value-object/CourseDescription'
import { CoursePrice } from '../../domain/value-object/CoursePrice'
import { CourseLevel } from '../../domain/value-object/CourseLevel'
import { CourseDuration } from '../../domain/value-object/CourseDuration'
import { InstructorId } from '../../domain/value-object/InstructorId'
import { CourseApiClient } from '../http/CourseApiClient'
import type { CourseResource } from '../http/CourseResource'

/**
 * Mirror de Infrastructure/Persistence/Eloquent/EloquentCourseRepository.php.
 *
 * Implementa el puerto CourseRepository usando CourseApiClient (Axios) en
 * vez de Eloquent. Es la única clase que traduce entre el JSON crudo del
 * backend (CourseResource) y el agregado de dominio (Course) — ni domain/
 * ni application/ conocen el shape HTTP.
 */
export class HttpCourseRepository implements CourseRepository {
  constructor(private readonly apiClient: CourseApiClient = new CourseApiClient()) {}

  async save(course: Course): Promise<void> {
    // `save` cubre solo el caso "crear" en este MVP. Cuando el backend
    // exponga PATCH /courses/{id}, se añade la rama de actualización aquí,
    // igual que EloquentCourseRepository resuelve insert vs update.
    await this.apiClient.create({
      title: course.currentTitle.toString(),
      description: course.currentDescription.toString(),
      instructor_id: course.instructorId.value,
      price_amount: course.price.amount,
      price_currency: course.price.currency,
      level: course.level.value,
      duration_minutes: course.duration.minutes,
    })
  }

  async findById(id: CourseId): Promise<Course | null> {
    try {
      const resource = await this.apiClient.findById(id.value)
      return this.toDomain(resource)
    } catch {
      return null
    }
  }

  async findAll(): Promise<Course[]> {
    const collection = await this.apiClient.findAll()
    return collection.data.map((resource) => this.toDomain(resource))
  }

  private toDomain(resource: CourseResource): Course {
    return Course.create({
      id: CourseId.fromString(resource.id),
      title: CourseTitle.fromString(resource.title),
      description: CourseDescription.fromString(resource.description),
      instructorId: InstructorId.fromString(resource.instructor_id),
      price: CoursePrice.of(resource.price.amount, resource.price.currency),
      level: CourseLevel.fromString(resource.level),
      duration: CourseDuration.fromMinutes(resource.duration_minutes),
    })
  }
}
