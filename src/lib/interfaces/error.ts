export class ApiError extends Error {
  status?: number;
  /**
   * The `data` payload from the error response, when there was one.
   *
   * Some failures are not final: verify-payment answers 400 for a payment that
   * is merely still settling as well as for one that failed, and only the body
   * says which.
   */
  data?: Record<string, unknown>;

  constructor(
    message: string,
    status?: number,
    data?: Record<string, unknown>,
  ) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
