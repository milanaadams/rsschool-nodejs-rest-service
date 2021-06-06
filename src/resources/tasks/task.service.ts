import * as taskRepo from './task.memory.repository';
import { Task, ITask } from './task.model';

/**
 * Gets all tasks by board id
 * @param {string} id board id
 * @returns array of Task instances
 */
const getAll = (id: string): Task[] => taskRepo.getAll(id);

/**
 * Gets task by task id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Task} Task instance
 */
const getById = (boardId: string, id: string): Task => taskRepo.getById(boardId, id);

/**
 * Creates new Task instance
 * @param {object} task object with task attributes
 * @returns {Task} Task instance
 */
const createTask = (task: ITask): Task => taskRepo.createTask(new Task(task));

/**
 * Updates task by task id
 * @param {string} id task id
 * @param {object} entity object with with attributes to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = ( id: string, entity: ITask ): Task => taskRepo.updateTask(id, entity);

/**
 * Removes task by task id
 * @param {string} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = (id: string): Task => taskRepo.deleteTask(id);

export { getAll, getById, createTask, updateTask, deleteTask };
