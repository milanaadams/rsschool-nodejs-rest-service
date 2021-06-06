import * as DB from '../../utils/dbUtils';
import { NotFoundError } from '../../errors/notFound';
import { TableName } from '../../utils/inMemoryDB';
import { Task, ITask } from './task.model';

const TABLE_NAME: TableName = 'Tasks';

/**
 * Gets all tasks by board id
 * @param {string} id board id
 * @returns {Task[]} array of Task instances
 */
const getAll = (id: string): Task[] => DB.getAllEntitiesByBoardId(TABLE_NAME, id) as Task[];

/**
 * Gets all tasks by user id
 * @param {string} id user id
 * @returns {Task[]} array of Task instances
 */
const getAllByUser = (id: string): Task[] => DB.getAllEntitiesByUserId(TABLE_NAME, id) as Task[];

/**
 * Gets task by task id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Task} Task instance
 */
const getById = (boardId: string, id: string): Task => {
  const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id) as Task;
  if (!task) throw new NotFoundError(`No task with id ${id}`, 404);
  return task;
}

/**
 * Saves new task to the DB
 * @param {Task} task Task instance
 * @returns {Task} Task instance
 */
const createTask = (task: Task): Task => DB.createEntity(TABLE_NAME, task) as Task;

/**
 * Updates task by task id
 * @param {string} id task id
 * @param {object} entity object with task properties to be updated
 * @returns {Task} updated Task instance
 */
const updateTask = (id: string, entity: ITask): Task => DB.updateEntity(TABLE_NAME, id, entity) as Task;

/**
 * Removes task by task id
 * @param {string} id task id
 * @returns {Task} deleted entity
 */
const deleteTask = (id: string): Task => DB.deleteEntity(TABLE_NAME, id) as Task;

export { getAll, getById, createTask, updateTask, deleteTask, getAllByUser };
