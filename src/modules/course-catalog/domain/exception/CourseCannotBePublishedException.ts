import { CourseCatalogException } from './CourseCatalogException'

export class CourseCannotBePublishedException extends CourseCatalogException {
  constructor(courseId: string, reason: string) {
    super(`Course "${courseId}" cannot be published: ${reason}`)
  }
}
