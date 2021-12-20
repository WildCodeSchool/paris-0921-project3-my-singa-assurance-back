const { BadRequestsError } = require('../error-types');

module.exports = (err, req, res, next) => {
  if (err instanceof BadRequestsError) {
    res.status(400).send('Bad Request');
  } else next(err);
};
