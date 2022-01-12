const subscriberRouter = require('./subscriberRouter');
const recipientRouter = require('./recipientRouter');
const authRouter = require('./authRouter');
const optionRouter = require('./optionRouter');

const router = (app) => {
  app.use('/subscribers', subscriberRouter);
  app.use('/recipients', recipientRouter);
  app.use('/auth', authRouter);
  app.use('/options', optionRouter);
};

module.exports = { router };
