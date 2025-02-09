export class RequestValidationError extends Error {
  constructor(public errors: string[]) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
