import { AggregateRoot } from '@/shared/domain/aggregate/AggregateRoot'
import { CourseId } from '../value-object/CourseId'
import { CourseTitle } from '../value-object/CourseTitle'
import { CourseDescription } from '../value-object/CourseDescription'
import { CourseStatus } from '../value-object/CourseStatus'
import { CoursePrice } from '../value-object/CoursePrice'
import { CourseLevel } from '../value-object/CourseLevel'
import { CourseDuration } from '../value-object/CourseDuration'
import { InstructorId } from '../value-object/InstructorId'
import { CourseCreated } from '../event/CourseCreated'
import { CoursePublished } from '../event/CoursePublished'
import { CourseAlreadyPublishedException } from '../exception/CourseAlreadyPublishedException'
import { CourseCannotBePublishedException } from '../exception/CourseCannotBePublishedException'

/**
 * Mirror de Domain/Model/Course.php.
 *
 * Importante: este agregado modela solo lo que la UI necesita para
 * mostrar y validar transiciones — no es un espejo 1:1 de las columnas
 * de la tabla `courses`. El shape completo que viaja por HTTP vive en
 * infrastructure/http/CourseResource.ts.
 */
export class Course extends AggregateRoot {
  private constructor(
    readonly id: CourseId,
    private title: CourseTitle,
    private description: CourseDescription,
    private status: CourseStatus,
    readonly instructorId: InstructorId,
    readonly price: CoursePrice,
    readonly level: CourseLevel,
    readonly duration: CourseDuration,
  ) {
    super()
  }

  static create(params: {
    id: CourseId
    title: CourseTitle
    description: CourseDescription
    instructorId: InstructorId
    price: CoursePrice
    level: CourseLevel
    duration: CourseDuration
  }): Course {
    const course = new Course(
      params.id,
      params.title,
      params.description,
      CourseStatus.draft(),
      params.instructorId,
      params.price,
      params.level,
      params.duration,
    )
    course.record(new CourseCreated(params.id.value, params.title.toString()))
    return course
  }

  publish(): void {
    if (this.status.equals(CourseStatus.fromString('published'))) {
      throw new CourseAlreadyPublishedException(this.id.value)
    }
    if (!this.status.canTransitionTo('published')) {
      throw new CourseCannotBePublishedException(
        this.id.value,
        `cannot transition from "${this.status.value}" to "published".`,
      )
    }
    this.status = CourseStatus.fromString('published')
    this.record(new CoursePublished(this.id.value))
  }

  get currentStatus(): CourseStatus {
    return this.status
  }

  get currentTitle(): CourseTitle {
    return this.title
  }

  get currentDescription(): CourseDescription {
    return this.description
  }
}
