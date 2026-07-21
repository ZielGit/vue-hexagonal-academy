/**
 * Mirror de Shared/Domain/Event/DomainEvent.php
 */
export abstract class DomainEvent {
  abstract readonly eventName: string
  readonly occurredOn: Date = new Date()
}
