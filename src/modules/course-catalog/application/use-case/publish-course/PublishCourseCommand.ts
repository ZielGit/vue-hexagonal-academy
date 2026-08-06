import { Command } from '@/shared/application/command/Command'

/** Mirror de Application/UseCase/PublishCourse/PublishCourseCommand.php */
export class PublishCourseCommand extends Command {
  constructor(readonly courseId: string) {
    super()
  }
}
