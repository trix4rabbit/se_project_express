// Sprint 15.1. Create custom error contstructors
// ConflictError (409)

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
