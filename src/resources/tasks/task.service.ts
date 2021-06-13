import * as taskRepo from './task.memory.repository';
import { Task, ITask } from './task.model';

const getAll = (id: string): Task[] => taskRepo.getAll(id);

const getById = (boardId: string, id: string): Task => taskRepo.getById(boardId, id);

const createTask = (task: ITask): Task => taskRepo.createTask(new Task(task));

const updateTask = ( id: string, entity: ITask ): Task => taskRepo.updateTask(id, entity);

const deleteTask = (id: string): Task => taskRepo.deleteTask(id);

export { getAll, getById, createTask, updateTask, deleteTask };
