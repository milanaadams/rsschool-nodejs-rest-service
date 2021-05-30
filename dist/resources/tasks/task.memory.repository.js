"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllByUser = exports.deleteTask = exports.updateTask = exports.createTask = exports.getById = exports.getAll = void 0;
const DB = require("../../utils/dbUtils");
const notFound_1 = require("../../errors/notFound");
const TABLE_NAME = 'Tasks';
/**
 * Gets all tasks by board id
 * @param {string} id board id
 * @returns {Task[]} array of Task instances
 */
const getAll = (id) => DB.getAllEntitiesByBoardId(TABLE_NAME, id);
exports.getAll = getAll;
/**
 * Gets all tasks by user id
 * @param {string} id user id
 * @returns {Task[]} array of Task instances
 */
const getAllByUser = (id) => DB.getAllEntitiesByUserId(TABLE_NAME, id);
exports.getAllByUser = getAllByUser;
/**
 * Gets task by task id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Task} Task instance
 */
const getById = (boardId, id) => {
    const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id);
    if (!task)
        throw new notFound_1.NotFoundError(`No task with id ${id}`, 404);
    return task;
};
exports.getById = getById;
/**
 * Saves new task to the DB
 * @param {Task} task Task instance
 * @returns {Task} Task instance
 */
const createTask = (task) => DB.createEntity(TABLE_NAME, task);
exports.createTask = createTask;
/**
 * Updates task by task id
 * @param {string} id task id
 * @param {object} entity object with task properties to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
exports.updateTask = updateTask;
/**
 * Removes task by task id
 * @param {string} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = (id) => DB.deleteEntity(TABLE_NAME, id);
exports.deleteTask = deleteTask;
