/**
 * @swagger
 *  tags:
 *    name: Authentication
 *    description: Login and register + email verification
 */

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const authController = require('../controller/authController');

router.get('/verify/:email', asyncHandler(authController.checkIfEmailExists));

/**
 * @swagger
 *  /auth/login:
 *    post:
 *      tags: [Authentication]
 *      name: login
 *      summary: log user and return authentication token
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Authentication is good, a token is returned
 *        401:
 *          description: Unauthorized, email or password invalid.
 */
router.post('/login', asyncHandler(authController.logIn));

/**
 * @swagger
 *  /auth/regsiter:
 *    post:
 *      tags: [Authentication]
 *      name: login
 *      summary: log user and return authentication token
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Authentication is good, a token is returned
 *        401:
 *          description: Unauthorized, email or password invalid.
 */
router.post('/register', asyncHandler(authController.register));

module.exports = router;
