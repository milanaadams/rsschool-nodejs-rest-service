"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getById = exports.getAll = void 0;
const boardRepo = require("./board.memory.repository");
const board_model_1 = require("./board.model");
/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = () => boardRepo.getAll();
exports.getAll = getAll;
/**
 * Gets board by its id
 * @param {string} id board id
 * @returns {Board} Board instance
 */
const getById = (id) => boardRepo.getById(id);
exports.getById = getById;
/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = (board) => boardRepo.createBoard(new board_model_1.Board(board));
exports.createBoard = createBoard;
/**
 * Update board instance by board id
 * @param {string} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = (id, entity) => boardRepo.updateBoard(id, entity);
exports.updateBoard = updateBoard;
/**
 * Remove board by its id
 * @param {string} id board id
 * @returns {<void>}
 */
const deleteBoard = (id) => boardRepo.deleteBoard(id);
exports.deleteBoard = deleteBoard;
