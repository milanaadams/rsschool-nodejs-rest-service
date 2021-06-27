import { Router } from 'express';
import * as controller from './login.controller';

const router = Router();

router.route('/login').post(controller.login);

export { router };
