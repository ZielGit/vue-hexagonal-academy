import type { Command } from '../command/Command'

/**
 * Mirror de Shared/Application/Bus/CommandHandlerInterface.php
 * Cada Handler del frontend (CreateCourseHandler, PublishCourseHandler)
 * implementa este contrato — igual que en Laravel.
 */
export interface CommandHandler<C extends Command, R> {
  handle(command: C): Promise<R>
}
