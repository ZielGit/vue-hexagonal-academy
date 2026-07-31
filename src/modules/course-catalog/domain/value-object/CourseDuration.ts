/** Duración total del curso, expresada en minutos — mismo criterio que el backend. */
export class CourseDuration {
  private constructor(readonly minutes: number) {}

  static fromMinutes(minutes: number): CourseDuration {
    if (minutes <= 0) {
      throw new Error('CourseDuration must be greater than zero.')
    }
    return new CourseDuration(minutes)
  }

  toHumanString(): string {
    const hours = Math.floor(this.minutes / 60)
    const mins = this.minutes % 60
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
  }
}
