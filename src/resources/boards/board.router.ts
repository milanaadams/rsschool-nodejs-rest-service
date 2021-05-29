import { Router }  from 'express';
import * as controller  from './board.controller';

const router = Router();

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createBoard);
router.route('/:id').put(controller.updateBoard);
router.route('/:id').delete(controller.deleteBoard);

export { router };
