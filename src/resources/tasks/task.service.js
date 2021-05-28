const taskRepo = require('./task.memory.repository');
const Task = require('./task.model')

/**
 * Gets all tasks by board id
 * @param {uuidv4} id board id
 * @returns array of Task instances
 */
const getAll = (id) => taskRepo.getAll(id);

/**
 * Gets task by task id and board id
 * @param {uuidv4} boardId board id
 * @param {uuidv4} id task id
 * @returns {Task} Task instance
 */
const getById = (boardId, id) => taskRepo.getById(boardId, id);

/**
 * Creates new Task instance
 * @param {object} task object with task attributes
 * @returns {Task} Task instance
 */
const createTask = task => taskRepo.createTask(new Task(task));

/**
 * Updates task by task id
 * @param {uuidv4} id task id
 * @param {object} entity object with with attributes to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = ( id, entity ) => taskRepo.updateTask(id, entity);

/**
 * Removes task by task id
 * @param {*} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = id => taskRepo.deleteTask(id);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
