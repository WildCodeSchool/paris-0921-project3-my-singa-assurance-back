const router = require('express').Router();

const subscriberController = require('../controller/subscriberController');

router.get('/', subscriberController.getMany);
router.get('/:id', subscriberController.getOneById);
router.post('/', subscriberController.postOne);
router.put('/:id', subscriberController.updateOne);
router.delete('/:id', subscriberController.deleteOne);

module.exports = router;
