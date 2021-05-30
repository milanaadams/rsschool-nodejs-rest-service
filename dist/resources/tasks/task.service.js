"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getById = exports.getAll = void 0;
const taskRepo = require("./task.memory.repository");
const task_model_1 = require("./task.model");
/**
 * Gets all tasks by board id
 * @param {string} id board id
 * @returns array of Task instances
 */
const getAll = (id) => taskRepo.getAll(id);
exports.getAll = getAll;
/**
 * Gets task by task id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Task} Task instance
 */
const getById = (boardId, id) => taskRepo.getById(boardId, id);
exports.getById = getById;
/**
 * Creates new Task instance
 * @param {object} task object with task attributes
 * @returns {Task} Task instance
 */
const createTask = (task) => taskRepo.createTask(new task_model_1.Task(task));
exports.createTask = createTask;
/**
 * Updates task by task id
 * @param {string} id task id
 * @param {object} entity object with with attributes to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = (id, entity) => taskRepo.updateTask(id, entity);
exports.updateTask = updateTask;
/**
 * Removes task by task id
 * @param {string} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = (id) => taskRepo.deleteTask(id);
exports.deleteTask = deleteTask;
