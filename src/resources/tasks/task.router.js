const router = require('express').Router({ mergeParams: true });
const controller = require('./task.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createTask);
router.route('/:id').put(controller.updateTask);
router.route('/:id').delete(controller.deleteTask);

module.exports = router;
