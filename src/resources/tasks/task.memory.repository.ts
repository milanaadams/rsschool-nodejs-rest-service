import * as DB from '../../utils/dbUtils';
import { NotFoundError } from '../../errors/notFound';
import { TableName } from '../../utils/inMemoryDB';
import { Task, ITask } from './task.model';

const TABLE_NAME: TableName = 'Tasks';

const getAll = (id: string): Task[] => DB.getAllEntitiesByBoardId(TABLE_NAME, id) as unknown as Task[];

const getAllByUser = (id: string): Task[] => DB.getAllEntitiesByUserId(TABLE_NAME, id) as unknown as Task[];

const getById = (boardId: string, id: string): Task => {
  const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id) as unknown as Task;
  if (!task) throw new NotFoundError(`No task with id ${id}`, 404);
  return task;
}

const createTask = async (task: Task): Promise<Task> => await DB.createEntity(TABLE_NAME, task) as unknown as Task;

const updateTask = async (id: string, entity: ITask): Promise<Task> => await DB.updateEntity(TABLE_NAME, id, entity) as unknown as Task;

const deleteTask = async (id: string): Promise<Task> => await DB.deleteEntity(TABLE_NAME, id) as unknown as Task;

export { getAll, getById, createTask, updateTask, deleteTask, getAllByUser };
