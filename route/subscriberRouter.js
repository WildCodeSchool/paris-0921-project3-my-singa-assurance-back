const router = require('express').Router();

const subscriberController = require('../controller/subscriberController');

router.get('/', subscriberController.getMany);
router.post('/', subscriberController.postOne);
router.put('/:id', subscriberController.updateOne);

module.exports = router;
