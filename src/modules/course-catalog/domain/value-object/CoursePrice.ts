export class CoursePrice {
  private constructor(
    readonly amount: number,
    readonly currency: string,
  ) {}

  static of(amount: number, currency = 'USD'): CoursePrice {
    if (amount < 0) {
      throw new Error('CoursePrice cannot be negative.')
    }
    return new CoursePrice(amount, currency)
  }

  isFree(): boolean {
    return this.amount === 0
  }

  toDisplayString(): string {
    return this.isFree() ? 'Free' : `${this.currency} ${this.amount.toFixed(2)}`
  }
}
