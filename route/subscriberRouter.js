const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const subscriberController = require('../controller/subscriberController');
const { checkCredentials } = require('../controller/authController');

router.get('/', checkCredentials, asyncHandler(subscriberController.getMany));
router.get('/:id', checkCredentials, asyncHandler(subscriberController.getOneById));
router.post('/', asyncHandler(subscriberController.postOne));
router.put('/:id', checkCredentials, asyncHandler(subscriberController.updateOne));
router.delete('/:id', checkCredentials, asyncHandler(subscriberController.deleteOne));

module.exports = router;
