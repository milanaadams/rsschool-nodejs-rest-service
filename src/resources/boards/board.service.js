const boardRepo = require('./board.memory.repository');
const Board = require('./board.model')

/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = () => boardRepo.getAll();

/**
 * Gets board by its id
 * @param {uuidv4} id board id
 * @returns {Board} Board instance
 */
const getById = id => boardRepo.getById(id);

/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = board => boardRepo.createBoard(new Board(board));

/**
 * Update board instance by board id
 * @param {uuidv4} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = ( id, entity ) => boardRepo.updateBoard(id, entity);

/**
 * Remove board by its id
 * @param {*} id board id
 * @returns {Promise<void>}
 */
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
