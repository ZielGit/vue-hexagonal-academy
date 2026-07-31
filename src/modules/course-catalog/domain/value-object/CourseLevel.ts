export const COURSE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type CourseLevelValue = (typeof COURSE_LEVELS)[number]

export class CourseLevel {
  private constructor(readonly value: CourseLevelValue) {}

  static fromString(value: string): CourseLevel {
    if (!COURSE_LEVELS.includes(value as CourseLevelValue)) {
      throw new Error(`Invalid CourseLevel: "${value}".`)
    }
    return new CourseLevel(value as CourseLevelValue)
  }
}
