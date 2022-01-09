const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const authController = require('../controller/authController');

router.post('/login', asyncHandler(authController.logIn));

module.exports = router;
