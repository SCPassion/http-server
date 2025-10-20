class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserNotAuthenticatedError extends Error {
    constructor(message: string) {
      super(message);
    }
  }

export { BadRequestError, NotFoundError, ForbiddenError, UnauthorizedError };