"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ValidationError";
        this.status = status;
    }
}
exports.NotFoundError = NotFoundError;
