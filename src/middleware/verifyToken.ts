import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config as envConfig } from 'dotenv';
import { NotFoundError } from '../errors/notFound';

envConfig();

// eslint-disable-next-line consistent-return
function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new NotFoundError('Please, include token into the Header', 401);
    return next(error);
  }

  const bearer = authHeader.split(' ');
  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.JWT_KEY, (err) => {
    if (err) {
      const error = new NotFoundError('Invalid token', 401);
      return next(error);
    }
    return next();
  });
}

export { verifyToken };
