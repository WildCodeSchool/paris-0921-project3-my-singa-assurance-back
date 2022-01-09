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
 *  /:
 *    get:
 *      summary: Return all subscibers
 *      tags: [Subscriber]
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
router.get('/', asyncHandler(subscriberController.getMany));
router.get('/:id', asyncHandler(subscriberController.getOneById));
router.post('/', asyncHandler(subscriberController.postOne));
router.put('/:id', asyncHandler(subscriberController.updateOne));
router.delete('/:id', asyncHandler(subscriberController.deleteOne));

module.exports = router;
