const router = require('express').Router();

const subscriberOption = require('../controller/optionController');

router.get('/', subscriberOption.getMany);

module.exports = router;
