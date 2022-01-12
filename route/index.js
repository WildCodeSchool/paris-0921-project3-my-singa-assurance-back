const subscriberRouter = require('./subscriberRouter');
const recipientRouter = require('./recipientRouter');
const authRouter = require('./authRouter');

const { checkCredentials } = require('../controller/authController');

const router = (app) => {
  app.use('/subscribers', checkCredentials, subscriberRouter);
  app.use('/recipients', checkCredentials, recipientRouter);
  app.use('/auth', authRouter);
};

module.exports = { router };
