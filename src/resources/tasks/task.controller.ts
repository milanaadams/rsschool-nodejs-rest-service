import { Request, Response, NextFunction } from 'express';
import * as taskService from './task.service';

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const tasks = taskService.getAll(req.params.boardId);
    res.json(tasks);
    next();
  } catch(err) {
    next(err);
  }
}

const getById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const task = taskService.getById(req.params.boardId, req.params.id);
    res.json(task);
    next();
  } catch(err) {
    next(err);
  }
}

const createTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    req.body.boardId = req.params.boardId;
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
    next();
  } catch (err) {
    next(err);
  }
}

const updateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
    next();
  } catch(err) {
    next(err);
  }
}

const deleteTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    taskService.deleteTask(req.params.id);
    res.sendStatus(200);
    next();
  } catch(err) {
    next(err);
  }
}

export { getAll, getById, createTask, updateTask, deleteTask };
