import { LessonId } from '../value-object/LessonId'

/** Mirror de Domain/Model/Lesson.php — placeholder mínimo, ver nota en Module.ts. */
export class Lesson {
  constructor(
    readonly id: LessonId,
    readonly moduleId: string,
    readonly title: string,
    readonly order: number,
  ) {}
}
