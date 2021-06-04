import { Request, Response } from 'express';

function getInvalidRoute(req: Request, res: Response, next: CallableFunction): void {
  const error = new Error(`Route not found`);
  res.status(400).json({ message: error.message });
  next(error);
}

export { getInvalidRoute };