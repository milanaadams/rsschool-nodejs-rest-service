import { Request, Response, NextFunction } from 'express';
import * as boardService from './board.service';

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const board = boardService.getAll();
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const getById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const board = boardService.getById(req.params.id);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const createBoard = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const board = boardService.createBoard(req.body);
    res.status(201).json(board);
  } catch(err) {
    next(err);
  }
}

const updateBoard = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const board = boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const deleteBoard = (req: Request, res: Response, next: NextFunction): void => {
  try {
    boardService.deleteBoard(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };
