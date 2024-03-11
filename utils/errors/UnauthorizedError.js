// Sprint 15.1. Create custom error contstructors
// UnauthorizedError (401)

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
