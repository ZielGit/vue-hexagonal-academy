import type { CommandHandler } from '@/shared/application/bus/CommandHandler'
import type { CourseRepository } from '../../../domain/repository/CourseRepository'
import { Course } from '../../../domain/model/Course'
import { CourseId } from '../../../domain/value-object/CourseId'
import { CourseTitle } from '../../../domain/value-object/CourseTitle'
import { CourseDescription } from '../../../domain/value-object/CourseDescription'
import { CoursePrice } from '../../../domain/value-object/CoursePrice'
import { CourseLevel } from '../../../domain/value-object/CourseLevel'
import { CourseDuration } from '../../../domain/value-object/CourseDuration'
import { InstructorId } from '../../../domain/value-object/InstructorId'
import { CreateCourseCommand } from './CreateCourseCommand'
import { CreateCourseResponse } from './CreateCourseResponse'

/**
 * Mirror de Application/UseCase/CreateCourse/CreateCourseHandler.php.
 *
 * Es TypeScript puro: no importa Vue, no importa Axios directamente.
 * Depende únicamente del puerto CourseRepository, inyectado por
 * constructor — igual que el Handler de Laravel depende de
 * CourseRepositoryInterface vía el contenedor de servicios.
 * Esto es lo que lo hace testeable sin montar un componente ni un
 * servidor HTTP real (ver tests/unit/.../CreateCourseHandler.spec.ts).
 */
export class CreateCourseHandler implements CommandHandler<CreateCourseCommand, CreateCourseResponse> {
  constructor(private readonly courseRepository: CourseRepository) {}

  async handle(command: CreateCourseCommand): Promise<CreateCourseResponse> {
    const course = Course.create({
      id: CourseId.fromString(crypto.randomUUID()),
      title: CourseTitle.fromString(command.title),
      description: CourseDescription.fromString(command.description),
      instructorId: InstructorId.fromString(command.instructorId),
      price: CoursePrice.of(command.priceAmount, command.priceCurrency),
      level: CourseLevel.fromString(command.level),
      duration: CourseDuration.fromMinutes(command.durationMinutes),
    })

    await this.courseRepository.save(course)

    return new CreateCourseResponse(
      course.id.value,
      course.currentTitle.toString(),
      course.currentStatus.value,
    )
  }
}
