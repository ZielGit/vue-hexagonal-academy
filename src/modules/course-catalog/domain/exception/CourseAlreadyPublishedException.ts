import { CourseCatalogException } from './CourseCatalogException'

export class CourseAlreadyPublishedException extends CourseCatalogException {
  constructor(courseId: string) {
    super(`Course "${courseId}" is already published.`)
  }
}
