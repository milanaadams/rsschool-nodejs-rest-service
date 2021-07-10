import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskStorage } from './tasks.storage';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskStorage],
})
export class TasksModule {}
