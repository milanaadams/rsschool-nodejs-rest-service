"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid = require("uuid");
class Board {
    constructor({ id = uuid.v4(), title = 'BOARD', columns = [
        {
            id: uuid.v4(),
            title: 'COLUMN',
            order: 0
        }
    ], } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((column) => (Object.assign({ id: uuid.v4() }, column)));
    }
}
exports.Board = Board;
