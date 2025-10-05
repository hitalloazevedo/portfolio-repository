export class HttpError extends Error {
  constructor(public code: number, public message: string, public details?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
