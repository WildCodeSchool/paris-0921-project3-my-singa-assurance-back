class RecordNotFoundError extends Error {}
class BadRequestsError extends Error {}
class UnAuthorizedError extends Error {}

module.exports = {
  RecordNotFoundError,
  BadRequestsError,
  UnAuthorizedError,
};
