import { Router } from 'express';
import * as controller from './user.controller';
import { hashPass } from '../../middleware/hashPass';

const router = Router();

router.route('/login').post(controller.login);
router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(hashPass, controller.createUser);
router.route('/:id').put(controller.updateUser);
router.route('/:id').delete(controller.deleteUser);

export { router };
