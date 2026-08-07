/**
 * Mirror de Infrastructure/Http/Resource/CourseResource.php.
 * Shape crudo tal como lo serializa el backend — el adapter de persistencia
 * lo mapea a un `Course` de dominio antes de entregarlo a application/.
 */
export interface CourseResource {
  id: string
  title: string
  description: string
  status: string
  instructor_id: string
  price: { amount: number; currency: string }
  level: string
  duration_minutes: number
}

export interface CourseCollectionResource {
  data: CourseResource[]
}
