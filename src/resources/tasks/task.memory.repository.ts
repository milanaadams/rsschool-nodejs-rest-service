import { getRepository } from 'typeorm';
import { NotFoundError } from '../../errors/notFound';
import { Task, ITask } from './task.model';

const getAll = async (id: string): Promise<Task[]> => {
  const tasks = await getRepository(Task).find({ boardId: id });
  if(!tasks) {
    throw new NotFoundError('Not found', 404);
  }
  return tasks;
}

const getById = async(id: string): Promise<Task> => { 
  const task = await getRepository(Task).findOne({ id }); 
  if(!task) {
    throw new NotFoundError(`No task with id ${id}`, 404);
  }
  return task;
}

const getAllByUser = async (id: string): Promise<Task[]> => getRepository(Task).find({ userId: id });

const getByBoardId = async (boardId: string, id: string): Promise<Task> => {
  const task = await getRepository(Task).findOne({ id, boardId });
  if(!task) {
    throw new NotFoundError(`No task with id ${id}`, 404);
  }
  return task;
}

const createTask = async (task: Task): Promise<Task> => {
  await getRepository(Task).save(task);
  return getById(task.id);
}

const updateTask = async (id: string, task: ITask): Promise<Task> => {
  const taskToUpdate = await getById(id);
  if(taskToUpdate) {
    await getRepository(Task).update(taskToUpdate, task);
  }
  return getById(task.id);
}

const deleteTask = async (id: string): Promise<Task> => {
  const task = await getById(id);
  await getRepository(Task).remove(task);
  return task;
}

export { getAll, getByBoardId, createTask, updateTask, deleteTask, getAllByUser };
