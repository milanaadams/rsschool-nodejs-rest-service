const DB = require('../../utils/dbUtils');
const TASK = require('../tasks/task.memory.repository');
const { NotFoundError } = require('../../errors/notFound');

const TABLE_NAME = 'Boards';

/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * Gets board by its id
 * @param {uuidv4} id  board id
 * @returns {Board} Board instance
 */
const getById = async (id) => {
  const board = DB.getEntity(TABLE_NAME, id);
  if (!board) throw new NotFoundError(`Board with id ${id} not found`, 404);
  return board;
}

/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = async (board) => DB.createEntity(TABLE_NAME, board);

/**
 * Update board instance by board id
 * @param {uuidv4} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);

/**
 * Remove board by its id
 * @param {uuidv4} id board id
 */
const deleteBoard = async (id) => {
  const board = await getById(id);
  if(board) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = await TASK.getAll(id);
    if(tasks) {
      tasks.forEach((task) => TASK.deleteTask(task.id));
    }
  }
}

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
