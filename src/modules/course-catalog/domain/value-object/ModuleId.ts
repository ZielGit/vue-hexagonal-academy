export class ModuleId {
  private constructor(readonly value: string) {}
  static fromString(value: string): ModuleId {
    if (!value) throw new Error('ModuleId cannot be empty.')
    return new ModuleId(value)
  }
}
