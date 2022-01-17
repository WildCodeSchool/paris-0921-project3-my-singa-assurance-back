const { NotFoundError } = require('../error-types');

module.exports = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};
