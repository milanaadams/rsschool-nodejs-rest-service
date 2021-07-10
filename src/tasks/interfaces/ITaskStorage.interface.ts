import { CreateTaskDto } from './../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface ITaskStorage {
  findAllTasks: (boardId: string) => Promise<Task[]>;
  findOneTask: (id: string) => Promise<Task>;
  findAllTasksByUser: (userId: string) => Promise<Task[]>;
  findAOneTasksByBoard: (boardId: string, taskId: string) => Promise<Task>;
  createTask: (taskDto: CreateTaskDto) => Promise<Task>;
  updateTask: (id: string, updateTaskDto: UpdateTaskDto) => Promise<Task>;
  deleteTask: (id: string) => Promise<Task>;
}
