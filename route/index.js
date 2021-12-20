const subscriberRouter = require('./subscriberRouter');
const authRouter = require('./authRouter');

const router = (app) => {
  app.use('/subscribers', subscriberRouter);
  app.use('/auth', authRouter);
};

module.exports = { router };
