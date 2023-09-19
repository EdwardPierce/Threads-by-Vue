export default class ApiError extends Error {
  status: number;
  errors: any; //todo correct type

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message?: string | undefined) {
    return new ApiError(401, message || "The user is not authorized");
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}
