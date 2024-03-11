// Sprint 15.1. Create New Middleware
// Create a middleware for centralized error handling in separate file
// Four arguments - err, req, res, and next
const errorHandler = (err, req, res, next) => {

   // error-handling middleware should log the errors to console 
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // return 500 in the case of unforseen error
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;
