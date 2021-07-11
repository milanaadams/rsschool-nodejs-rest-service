import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ITaskStorage } from './interfaces/ITaskStorage.interface';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskStorage implements ITaskStorage {
  async findAllTasks(boardId: string): Promise<Task[]> {
    const tasks = await getRepository(Task).find({ boardId });
    if (!tasks.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return tasks;
  }

  async findOneTask(id: string): Promise<Task> {
    const task = await getRepository(Task).findOne({ id });
    if (!task) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async findAllTasksByUser(userId: string): Promise<Task[]> {
    return getRepository(Task).find({ userId: userId });
  }

  async findAOneTasksByBoard(boardId: string, id: string): Promise<Task> {
    const task = await getRepository(Task).findOne({ id, boardId });
    return task;
  }

  async findAAllTasksByBoard(boardId: string): Promise<Task[]> {
    const tasks = await getRepository(Task).find({ boardId });
    return tasks;
  }

  async createTask(newTask: CreateTaskDto): Promise<Task> {
    await getRepository(Task).save(newTask);
    return this.findOneTask(newTask.id);
  }

  async updateTask(id: string, newTaskInfo: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.findOneTask(id);
    if (taskToUpdate) {
      await getRepository(Task).update(taskToUpdate, newTaskInfo);
    }
    return this.findOneTask(taskToUpdate.id);
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.findOneTask(id);
    if (task) {
      await getRepository(Task).remove(task);
    }
    return task;
  }
}
