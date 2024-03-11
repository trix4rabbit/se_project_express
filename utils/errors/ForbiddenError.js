// Sprint 15.1. Create custom error contstructors
// ForbiddenError (403)

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
