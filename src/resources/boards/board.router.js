const router = require('express').Router();
const controller = require('./board.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createBoard);
router.route('/:id').put(controller.updateBoard);
router.route('/:id').delete(controller.deleteBoard);

module.exports = router;
