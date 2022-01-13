const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const recipientController = require('../controller/recipientController');

router.get('/:id', asyncHandler(recipientController.getMany));
router.post('/', asyncHandler(recipientController.postOne));
router.put('/:id', asyncHandler(recipientController.updateOne));
router.delete('/:id', asyncHandler(recipientController.deleteOne));

module.exports = router;
