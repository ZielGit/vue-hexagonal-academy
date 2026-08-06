import type { CommandHandler } from '@/shared/application/bus/CommandHandler'
import type { CourseRepository } from '../../../domain/repository/CourseRepository'
import { CourseId } from '../../../domain/value-object/CourseId'
import { CourseNotFoundException } from '../../../domain/exception/CourseNotFoundException'
import { PublishCourseCommand } from './PublishCourseCommand'

/**
 * Mirror de Application/UseCase/PublishCourse/PublishCourseHandler.php.
 * Nota: el backend no define un PublishCourseResponse propio — reutilizamos
 * `void`, igual que haríamos en PHP si el Handler no retorna nada explícito.
 */
export class PublishCourseHandler implements CommandHandler<PublishCourseCommand, void> {
  constructor(private readonly courseRepository: CourseRepository) {}

  async handle(command: PublishCourseCommand): Promise<void> {
    const id = CourseId.fromString(command.courseId)
    const course = await this.courseRepository.findById(id)

    if (!course) {
      throw new CourseNotFoundException(command.courseId)
    }

    course.publish()
    await this.courseRepository.save(course)
  }
}
