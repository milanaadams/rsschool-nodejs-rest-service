import * as DB from '../../utils/dbUtils';
import { NotFoundError } from '../../errors/notFound';
import { TableName } from '../../utils/inMemoryDB';
import { Task, ITask } from './task.model';

const TABLE_NAME: TableName = 'Tasks';

const getAll = (id: string): Task[] => DB.getAllEntitiesByBoardId(TABLE_NAME, id) as Task[];

const getAllByUser = (id: string): Task[] => DB.getAllEntitiesByUserId(TABLE_NAME, id) as Task[];

const getById = (boardId: string, id: string): Task => {
  const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id) as Task;
  if (!task) throw new NotFoundError(`No task with id ${id}`, 404);
  return task;
}

const createTask = (task: Task): Task => DB.createEntity(TABLE_NAME, task) as Task;

const updateTask = (id: string, entity: ITask): Task => DB.updateEntity(TABLE_NAME, id, entity) as Task;

const deleteTask = (id: string): Task => DB.deleteEntity(TABLE_NAME, id) as Task;

export { getAll, getById, createTask, updateTask, deleteTask, getAllByUser };
