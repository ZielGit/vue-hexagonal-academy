import { DomainEvent } from '@/shared/domain/event/DomainEvent'

export class CourseArchived extends DomainEvent {
  readonly eventName = 'course.archived'
  constructor(readonly courseId: string) {
    super()
  }
}
