import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './notFound';
// import { errorLogger } from '../logging/request-logging';
/**
 * Middleware for handling errors
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function handleErrors(err: NotFoundError, req: Request, res: Response, next: NextFunction): void {
  if (!res.headersSent) {
    res.status(err.status || 500).json({ message: err.message || 'Something went went' });
  }
  // errorLogger(req, res, next);
  next();
}
