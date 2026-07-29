import { DomainEvent } from '@/shared/domain/event/DomainEvent'

export class CoursePublished extends DomainEvent {
  readonly eventName = 'course.published'
  constructor(readonly courseId: string) {
    super()
  }
}
