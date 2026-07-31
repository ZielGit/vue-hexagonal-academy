/**
 * Mirror de Domain/ValueObject/CourseStatus.php
 * Las transiciones válidas se validan aquí también, replicando las reglas
 * que en el backend viven en Course::publish()/archive() y lanzan
 * InvalidCourseTransitionException.
 */
export const COURSE_STATUSES = ['draft', 'published', 'archived'] as const
export type CourseStatusValue = (typeof COURSE_STATUSES)[number]

const VALID_TRANSITIONS: Record<CourseStatusValue, CourseStatusValue[]> = {
  draft: ['published'],
  published: ['archived'],
  archived: [],
}

export class CourseStatus {
  private constructor(readonly value: CourseStatusValue) {}

  static fromString(value: string): CourseStatus {
    if (!COURSE_STATUSES.includes(value as CourseStatusValue)) {
      throw new Error(`Invalid CourseStatus: "${value}".`)
    }
    return new CourseStatus(value as CourseStatusValue)
  }

  static draft(): CourseStatus {
    return new CourseStatus('draft')
  }

  canTransitionTo(target: CourseStatusValue): boolean {
    return VALID_TRANSITIONS[this.value].includes(target)
  }

  equals(other: CourseStatus): boolean {
    return this.value === other.value
  }
}
