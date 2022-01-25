class RecordNotFoundError extends Error {}
class BadRequestsError extends Error {}
class UnAuthorizedError extends Error {}
class ConflictError extends Error {}
class NotFoundError extends Error {}

module.exports = {
  RecordNotFoundError,
  BadRequestsError,
  UnAuthorizedError,
  ConflictError,
  NotFoundError,
};
