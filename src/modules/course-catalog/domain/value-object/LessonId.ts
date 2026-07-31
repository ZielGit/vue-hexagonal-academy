export class LessonId {
  private constructor(readonly value: string) {}
  static fromString(value: string): LessonId {
    if (!value) throw new Error('LessonId cannot be empty.')
    return new LessonId(value)
  }
}
