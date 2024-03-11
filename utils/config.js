// Followed post in Sprint 15 in discord on .env file
// JWT_SECRET will use value from .env on the server.  In case it does not exit, 'dev-secret' will be used instead.
const { NODE_ENV, JWT_SECRET = "dev-secret"} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
};
