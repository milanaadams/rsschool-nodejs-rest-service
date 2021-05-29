import { Router } from 'express';
import * as controller from './user.controller';

const router = Router();

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createUser);
router.route('/:id').put(controller.updateUser);
router.route('/:id').delete(controller.deleteUser);

export { router };
