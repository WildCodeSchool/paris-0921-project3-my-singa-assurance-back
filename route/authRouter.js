const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const authController = require('../controller/authController');

router.get('/verify/:email', asyncHandler(authController.checkIfEmailExists));
router.post('/login', asyncHandler(authController.logIn));
router.post('/register', asyncHandler(authController.register));

module.exports = router;
