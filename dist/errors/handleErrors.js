"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
/**
 * Middleware for handling errors
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function handleErrors(err, req, res, next) {
    if (!res.headersSent) {
        res.status(err.status || 500).json({ message: err.message || 'Something went went' });
    }
    next();
}
exports.handleErrors = handleErrors;
