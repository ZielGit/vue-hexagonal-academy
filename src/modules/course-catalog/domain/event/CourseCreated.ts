import { DomainEvent } from '@/shared/domain/event/DomainEvent'

export class CourseCreated extends DomainEvent {
  readonly eventName = 'course.created'
  constructor(
    readonly courseId: string,
    readonly title: string,
  ) {
    super()
  }
}
