import { Request, Response, NextFunction } from 'express';
import * as boardService from './board.service';

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const board = await boardService.getAll();
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const createBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const board = await boardService.createBoard(req.body);
    res.status(201).json(board);
  } catch(err) {
    next(err);
  }
}

const updateBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const deleteBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };
