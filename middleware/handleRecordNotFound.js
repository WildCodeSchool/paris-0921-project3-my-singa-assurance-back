const { RecordNotFoundError } = require('../error-types');

module.exports = (err, req, res, next) => {
  if (err instanceof RecordNotFoundError) {
    res.status(404).send('Record not found');
  } else next(err);
};
