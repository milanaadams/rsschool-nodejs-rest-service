import { Router } from 'express';
import  * as controller from './task.controller';

const router = Router({ mergeParams: true });

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createTask);
router.route('/:id').put(controller.updateTask);
router.route('/:id').delete(controller.deleteTask);

export { router };
