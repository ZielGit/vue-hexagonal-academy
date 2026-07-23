/**
 * Mirror de Shared/Application/Response/{SuccessResponse,ErrorResponse}.php
 */
export class SuccessResponse<T> {
  readonly ok = true as const
  constructor(readonly data: T) {}
}

export class ErrorResponse {
  readonly ok = false as const
  constructor(
    readonly message: string,
    readonly code?: string,
  ) {}
}

export type Result<T> = SuccessResponse<T> | ErrorResponse
