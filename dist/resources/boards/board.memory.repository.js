"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getById = exports.getAll = void 0;
const DB = require("../../utils/dbUtils");
const TASK = require("../tasks/task.memory.repository");
const notFound_1 = require("../../errors/notFound");
const TABLE_NAME = 'Boards';
/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = () => DB.getAllEntities(TABLE_NAME);
exports.getAll = getAll;
/**
 * Gets board by its id
 * @param {string} id  board id
 * @returns {Board} Board instance
 */
const getById = (id) => {
    const board = DB.getEntity(TABLE_NAME, id);
    if (!board)
        throw new notFound_1.NotFoundError(`Board with id ${id} not found`, 404);
    return board;
};
exports.getById = getById;
/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = (board) => DB.createEntity(TABLE_NAME, board);
exports.createBoard = createBoard;
/**
 * Update board instance by board id
 * @param {string} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
exports.updateBoard = updateBoard;
/**
 * Remove board by its id
 * @param {string} id board id
 */
const deleteBoard = (id) => {
    const board = getById(id);
    if (board) {
        DB.deleteEntity(TABLE_NAME, id);
        const tasks = TASK.getAll(id);
        if (tasks) {
            tasks.forEach((task) => TASK.deleteTask(task.id));
        }
    }
};
exports.deleteBoard = deleteBoard;
