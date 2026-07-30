/**
 * Mirror de Domain/Exception/CourseCatalogException.php — excepción base
 * de la que heredan todas las excepciones de dominio del módulo.
 */
export abstract class CourseCatalogException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
