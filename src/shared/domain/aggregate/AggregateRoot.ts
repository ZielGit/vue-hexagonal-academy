import type { DomainEvent } from '../event/DomainEvent'

/**
 * Mirror de Shared/Domain/Aggregate/AggregateRoot.php
 *
 * En el backend, AggregateRoot acumula DomainEvents para el Event Store.
 * En el frontend no hacemos Event Sourcing, pero mantenemos el mismo
 * contrato: un agregado puede narrar qué eventos ocurrieron durante una
 * operación (útil para logs, notificaciones UI, invalidación de cache).
 */
export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = []

  protected record(event: DomainEvent): void {
    this.domainEvents.push(event)
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents]
    this.domainEvents = []
    return events
  }
}
