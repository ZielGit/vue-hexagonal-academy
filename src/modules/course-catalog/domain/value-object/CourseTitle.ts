const MAX_LENGTH = 150

export class CourseTitle {
  private constructor(readonly value: string) {}

  static fromString(value: string): CourseTitle {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      throw new Error('CourseTitle cannot be empty.')
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`CourseTitle cannot exceed ${MAX_LENGTH} characters.`)
    }
    return new CourseTitle(trimmed)
  }

  toString(): string {
    return this.value
  }
}
