const router = require('express').Router();

const authController = require('../controller/authController');

router.post('/', authController.logIn);

module.exports = router;
