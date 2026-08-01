import { ModuleId } from '../value-object/ModuleId'

/**
 * Mirror de Domain/Model/Module.php.
 * Placeholder mínimo — se completa cuando el flujo "agregar módulo a
 * curso" entre al alcance (hoy el MVP solo cubre Create/Publish Course).
 */
export class Module {
  constructor(
    readonly id: ModuleId,
    readonly courseId: string,
    readonly title: string,
    readonly order: number,
  ) {}
}
