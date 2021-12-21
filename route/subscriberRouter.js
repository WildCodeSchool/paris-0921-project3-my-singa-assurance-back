const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const subscriberController = require('../controller/subscriberController');

router.get('/', asyncHandler(subscriberController.getMany));
router.get('/:id', asyncHandler(subscriberController.getOneById));
router.post('/', asyncHandler(subscriberController.postOne));
router.put('/:id', asyncHandler(subscriberController.updateOne));
router.delete('/:id', asyncHandler(subscriberController.deleteOne));

module.exports = router;
