const router = require('express').Router();
const controller = require('./user.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createUser);
router.route('/:id').put(controller.updateUser);
router.route('/:id').delete(controller.deleteUser);

module.exports = router;
