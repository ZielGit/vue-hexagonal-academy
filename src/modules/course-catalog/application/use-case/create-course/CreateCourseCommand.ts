import { Command } from '@/shared/application/command/Command'

/** Mirror de Application/UseCase/CreateCourse/CreateCourseCommand.php */
export class CreateCourseCommand extends Command {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly instructorId: string,
    readonly priceAmount: number,
    readonly priceCurrency: string,
    readonly level: string,
    readonly durationMinutes: number,
  ) {
    super()
  }
}
