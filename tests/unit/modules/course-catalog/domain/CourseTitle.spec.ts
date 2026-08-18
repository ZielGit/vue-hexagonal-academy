import { describe, it, expect } from 'vitest'
import { CourseTitle } from '@/modules/course-catalog/domain/value-object/CourseTitle'

describe('CourseTitle', () => {
  it('accepts a valid title', () => {
    const title = CourseTitle.fromString('Domain-Driven Design 101')
    expect(title.toString()).toBe('Domain-Driven Design 101')
  })

  it('rejects an empty title', () => {
    expect(() => CourseTitle.fromString('   ')).toThrow('CourseTitle cannot be empty.')
  })

  it('rejects a title longer than 150 characters', () => {
    const tooLong = 'a'.repeat(151)
    expect(() => CourseTitle.fromString(tooLong)).toThrow(/cannot exceed 150 characters/)
  })
})
