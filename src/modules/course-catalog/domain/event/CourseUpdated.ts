import { DomainEvent } from '@/shared/domain/event/DomainEvent'

export class CourseUpdated extends DomainEvent {
  readonly eventName = 'course.updated'
  constructor(readonly courseId: string) {
    super()
  }
}
