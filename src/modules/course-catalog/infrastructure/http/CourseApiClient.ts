import type { AxiosInstance } from 'axios'
import { httpClient } from '@/shared/infrastructure/http/HttpClient'
import type { CreateCourseRequest } from './CreateCourseRequest'
import type { CourseCollectionResource, CourseResource } from './CourseResource'

/**
 * Mirror de Infrastructure/Http/Controller/CourseController.php — pero del
 * lado cliente: no "controla" nada, solo llama a los endpoints que ese
 * controller expone. Es la única clase del módulo que sabe que Axios existe.
 */
export class CourseApiClient {
  constructor(private readonly http: AxiosInstance = httpClient) {}

  async create(payload: CreateCourseRequest): Promise<CourseResource> {
    const { data } = await this.http.post<CourseResource>('/courses', payload)
    return data
  }

  async publish(courseId: string): Promise<void> {
    await this.http.post(`/courses/${courseId}/publish`)
  }

  async findById(courseId: string): Promise<CourseResource> {
    const { data } = await this.http.get<CourseResource>(`/courses/${courseId}`)
    return data
  }

  async findAll(): Promise<CourseCollectionResource> {
    const { data } = await this.http.get<CourseCollectionResource>('/courses')
    return data
  }
}
