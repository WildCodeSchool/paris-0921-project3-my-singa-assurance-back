const subscriberRouter = require('./subscriberRouter');
const recipientRouter = require('./recipientRouter');
const authRouter = require('./authRouter');

const router = (app) => {
  app.use('/subscribers', subscriberRouter);
  app.use('/recipients', recipientRouter);
  app.use('/auth', authRouter);
};

module.exports = { router };
