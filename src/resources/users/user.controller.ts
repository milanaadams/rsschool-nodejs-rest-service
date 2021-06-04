import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';
import * as usersService from './user.service';

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const users = usersService.getAll();
    res.json(users.map(User.toResponse));
    next();
  } catch(err) {
    next(err);
  }
}

const getById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = usersService.getById(req.params.id);
    res.json(User.toResponse(user));
    next();
  } catch(err) {
    next(err);
  }
}

const createUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    /* const user = usersService.createUser(req.body);
    res.status(201).json(User.toResponse(user));
    next(); */
    throw new Error('Oops, not created')
  } catch(err) {
    next(err);
  }
}

const updateUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(user));
    next();
  } catch(err) {
    next(err);
  }
}

const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    usersService.deleteUser(req.params.id);
    res.sendStatus(200);
    next();
  } catch(err) {
    next(err);
  }
}

export { getAll, getById, createUser, updateUser, deleteUser };
