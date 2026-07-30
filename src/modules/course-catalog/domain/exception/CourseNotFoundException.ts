import { CourseCatalogException } from './CourseCatalogException'

export class CourseNotFoundException extends CourseCatalogException {
  constructor(courseId: string) {
    super(`Course with id "${courseId}" was not found.`)
  }
}
