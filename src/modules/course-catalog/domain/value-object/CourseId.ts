/**
 * Mirror de Domain/ValueObject/CourseId.php
 * Value Object simple: envuelve un UUID y valida su forma en el constructor,
 * igual que el VO de PHP valida en su propio constructor.
 */
export class CourseId {
  private constructor(readonly value: string) {}

  static fromString(value: string): CourseId {
    if (!value || value.trim().length === 0) {
      throw new Error('CourseId cannot be empty.')
    }
    return new CourseId(value)
  }

  equals(other: CourseId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
