// Sprint 15.1. Create custom error contstructors
// NotFoundError (404)

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
