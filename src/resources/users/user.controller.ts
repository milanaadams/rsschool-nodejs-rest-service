import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from './user.model';
import * as usersService from './user.service';

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // throw Error('Oops!');
    const users = usersService.getAll();
    res.json((await users).map(User.toResponse));
  } catch(err) {
    next(err);
  }
}

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await usersService.deleteUser(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await usersService.authUser(req.body);
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

export { getAll, getById, createUser, updateUser, deleteUser, login };
