import { BoardStorage } from './boards.storage';
import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TaskStorage } from '../tasks/tasks.storage';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardStorage, TaskStorage],
})
export class BoardsModule {}
