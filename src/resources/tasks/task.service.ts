import * as taskRepo from './task.memory.repository';
import { Task, ITask } from './task.model';

const getAll = async (id: string): Promise<Task[]> => taskRepo.getAll(id);

const getById = async (boardId: string, id: string): Promise<Task> => taskRepo.getById(boardId, id);

const createTask = async (task: ITask): Promise<Task> => taskRepo.createTask(new Task(task));

const updateTask = async ( id: string, entity: ITask ): Promise<Task> => taskRepo.updateTask(id, entity);

const deleteTask = async (id: string): Promise<Task> => taskRepo.deleteTask(id);

export { getAll, getById, createTask, updateTask, deleteTask };
