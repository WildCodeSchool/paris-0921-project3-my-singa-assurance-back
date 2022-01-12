const router = require('express').Router();

const optionController = require('../controller/optionController');

router.get('/', optionController.getMany);

module.exports = router;
