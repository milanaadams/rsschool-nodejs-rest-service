const DB = require('../../utils/dbUtils');
const { NotFoundError } = require('../../errors/notFound');

const TABLE_NAME = 'Tasks';

/**
 * Gets all tasks by board id
 * @param {uuidv4} id board id
 * @returns {Task[]} array of Task instances
 */
const getAll = async (id) => DB.getAllEntitiesByBoardId(TABLE_NAME, id);

/**
 * Gets all tasks by user id
 * @param {uuidv4} id user id
 * @returns {Task[]} array of Task instances
 */
const getAllByUser = async (id) => DB.getAllEntitiesByUserId(TABLE_NAME, id);

/**
 * Gets task by task id and board id
 * @param {uuidv4} boardId board id
 * @param {uuidv4} id task id
 * @returns {Task} Task instance
 */
const getById = async (boardId, id) => {
  const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id);
  if (!task) throw new NotFoundError(`No task with id ${id}`, 404);
  return task;
}

/**
 * Saves new task to the DB
 * @param {Task} task Task instance
 * @returns {Task} Task instance
 */
const createTask = async (task) => DB.createEntity(TABLE_NAME, task);

/**
 * Updates task by task id
 * @param {uuidv4} id task id
 * @param {object} entity object with task properties to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);

/**
 * Removes task by task id
 * @param {uuidv4} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = async (id) => DB.deleteEntity(TABLE_NAME, id);

module.exports = { getAll, getById, createTask, updateTask, deleteTask, getAllByUser };
