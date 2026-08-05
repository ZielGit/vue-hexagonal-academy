/** Mirror de Application/UseCase/CreateCourse/CreateCourseResponse.php */
export class CreateCourseResponse {
  constructor(
    readonly courseId: string,
    readonly title: string,
    readonly status: string,
  ) {}
}
