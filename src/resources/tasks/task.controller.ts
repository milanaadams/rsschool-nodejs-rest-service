import { Request, Response, NextFunction } from 'express';
import * as taskService from './task.service';

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks);
  } catch(err) {
    next(err);
  }
}

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await taskService.getByBoardId(req.params.boardId, req.params.id);
    res.json(task);
  } catch(err) {
    next(err);
  }
}

const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    req.body.boardId = req.params.boardId;
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch(err) {
    next(err);
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.deleteTask(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

export { getAll, getById, createTask, updateTask, deleteTask };
