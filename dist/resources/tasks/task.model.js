"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid = require("uuid");
class Task {
    constructor({ id = uuid.v4(), title = 'TASK', order = 0, description = 'Description', userId = '', boardId = '', columnId = '' } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.Task = Task;
