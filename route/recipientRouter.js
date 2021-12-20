const router = require('express').Router();

const recipientController = require('../controller/recipientController');

router.get('/', recipientController.getMany);
router.get('/:id', recipientController.getOneById);
router.post('/', recipientController.postOne);
router.put('/:id', recipientController.updateOne);
router.delete('/:id', recipientController.deleteOne);

module.exports = router;
