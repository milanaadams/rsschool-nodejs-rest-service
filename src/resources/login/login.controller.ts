import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as loginService from './login.service';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await loginService.authUser(req.body);
    const payload = { id: user.id, login: user.login };
      jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 30 }, (err: Error, jwttoken: string) => {
        if (err) {
          return next(err);
        }
        return res.json({ token: jwttoken });
      });
  } catch(err) {
    next(err);
  }
}

export { login };