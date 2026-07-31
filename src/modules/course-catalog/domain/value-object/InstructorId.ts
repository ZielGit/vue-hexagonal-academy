export class InstructorId {
  private constructor(readonly value: string) {}

  static fromString(value: string): InstructorId {
    if (!value || value.trim().length === 0) {
      throw new Error('InstructorId cannot be empty.')
    }
    return new InstructorId(value)
  }
}
