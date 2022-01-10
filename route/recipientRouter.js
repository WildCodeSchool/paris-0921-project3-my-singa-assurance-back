const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const recipientController = require('../controller/recipientController');
const { checkCredentials } = require('../controller/authController');

router.get('/:id', checkCredentials, asyncHandler(recipientController.getMany));
router.post('/', checkCredentials, asyncHandler(recipientController.postOne));
router.put('/:id', checkCredentials, asyncHandler(recipientController.updateOne));
router.delete('/:id', checkCredentials, asyncHandler(recipientController.deleteOne));

module.exports = router;
