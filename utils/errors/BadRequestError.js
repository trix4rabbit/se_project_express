// Sprint 15.1. Create custom error contstructors
// BadRequestError (400)

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
