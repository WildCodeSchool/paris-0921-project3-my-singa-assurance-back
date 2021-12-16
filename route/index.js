const subscriberRouter = require('./subscriberRouter');

const router = (app) => {
  app.use('/subscribers', subscriberRouter);
};

module.exports = { router };
