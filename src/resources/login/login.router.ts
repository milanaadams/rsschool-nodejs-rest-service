import { Router } from 'express';
import * as controller from './login.controller';

const router = Router();

router.route('/').post(controller.login);

export { router };
