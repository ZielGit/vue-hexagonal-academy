export class CourseDescription {
  private constructor(readonly value: string) {}

  static fromString(value: string): CourseDescription {
    return new CourseDescription(value.trim())
  }

  toString(): string {
    return this.value
  }
}
