import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStorage } from './tasks.storage';

@Injectable()
export class TasksService {
  constructor(private readonly taskStorage: TaskStorage) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskStorage.createTask(createTaskDto);
  }

  findAll(boardId: string) {
    return this.taskStorage.findAllTasks(boardId);
  }

  findOne(id: string) {
    return this.taskStorage.findOneTask(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskStorage.updateTask(id, updateTaskDto);
  }

  remove(id: string) {
    return this.taskStorage.deleteTask(id);
  }
}
