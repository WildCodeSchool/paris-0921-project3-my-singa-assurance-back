const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { router } = require('./route');
const { SERVER_PORT } = require('./env');

const handleRecordNotFound = require('./middleware/handleRecordNotFound');
const handleBadRequest = require('./middleware/handleBadRequest');
const handleUnAuthorized = require('./middleware/handleUnAuthorized');
const handleInternalError = require('./middleware/handleInternalError');
const handleNotFoundError = require('./middleware/handleNotFoundError');
const handleConflict = require('./middleware/handleConflict');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Singa Express API',
      version: '0.1.0',
      description: 'CRUD API to manage subscriptions and recipients for Singa Assurance',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          name: 'authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/',
      },
    ],
  },
  apis: ['./route/*.js'],
};

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

router(app);

app.use(handleBadRequest);
app.use(handleRecordNotFound);
app.use(handleUnAuthorized);
app.use(handleConflict);
app.use(handleNotFoundError);
app.use(handleInternalError);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on : ${SERVER_PORT}`);
});

// process.on('unhandledRejection', (error) => {
//   console.error('unhandledRejection', JSON.stringify(error), error.stack);
//   process.exit(1);
// });

// process.on('uncaughtException', (error) => {
//   console.error('uncaughtException', JSON.stringify(error), error.stack);
//   process.exit(1);
// });

// process.on('beforeExit', () => {
//   app.close((error) => {
//     if (error) console.error(JSON.stringify(error), error.stack);
//   });
// });

module.exports = server;
