const { ConflictError } = require('../error-types');

module.exports = (err, req, res, next) => {
  if (err instanceof ConflictError) {
    res.status(409).send('Email already exists');
  } else {
    next(err);
  }
};
