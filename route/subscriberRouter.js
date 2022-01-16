/**
 * @swagger
 *  components:
 *    schemas:
 *      Subscriber:
 *         type: object
 *         required:
 *           - first_name
 *           - last_name
 *           - email
 *           - birth_date
 *         properties:
 *           id:
 *             type: interger
 *             description: The auto-generated id for subscriber
 *           first_name:
 *             type: string
 *             description: First name of the subscriber
 *           last_name:
 *             type: string
 *             description: Last name of the subscriber
 *           email:
 *             type: string
 *             description: Email of the subscriber
 *           birth_date:
 *             type: string
 *             description: Birth date of the subscriber
 *         example:
 *          id: 1
 *          first_name: John
 *          last_name: Doe
 *          email: JohnDoe@gmail.com
 *          birth_date: 01/01/1970
 */

/**
 * @swagger
 *  tags:
 *    name: Subscriber
 *    description: CRUD of subscribers
 */

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const subscriberController = require('../controller/subscriberController');

/**
 * @swagger
 *  /subscribers:
 *    get:
 *      tags: [Subscriber]
 *      name: Get all subscribers
 *      summary: Return all subscibers
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: The list of all subscribers
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Subscriber'
 *        401:
 *          description: Unauthorized, you need a valid token and right access.
 */
router.get('/', asyncHandler(subscriberController.getMany));

/**
 * @swagger
 *  /subscribers/{id}:
 *    get:
 *      tags: [Subscriber]
 *      name: Get a subscriber by id
 *      summary: Return a subscriber by id
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *        - in: path
 *      responses:
 *        200:
 *          description: The list of all subscribers
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Subscriber'
 */
router.get('/:id', asyncHandler(subscriberController.getOneById));
router.put('/:id', asyncHandler(subscriberController.updateOne));
router.delete('/:id', asyncHandler(subscriberController.deleteOne));

module.exports = router;
