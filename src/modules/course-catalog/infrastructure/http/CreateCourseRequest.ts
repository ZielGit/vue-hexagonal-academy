/**
 * Mirror de Infrastructure/Http/Request/CreateCourseRequest.php.
 * Mismo shape y mismas reglas de validación que el FormRequest de Laravel
 * espera en el body de POST /api/courses.
 */
export interface CreateCourseRequest {
  title: string
  description: string
  instructor_id: string
  price_amount: number
  price_currency: string
  level: string
  duration_minutes: number
}
