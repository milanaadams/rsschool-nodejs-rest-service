import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

function hashPass(req: Request, res: Response, next: CallableFunction): void {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(err) {
      next(err);
    }
    req.body.password = hash;
    next();
  });
}

export { hashPass };
