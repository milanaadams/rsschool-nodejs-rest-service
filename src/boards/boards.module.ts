import { BoardStorage } from './boards.storage';
import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TaskStorage } from '../tasks/tasks.storage';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardStorage, TaskStorage],
  imports: [forwardRef(() => LoginModule)],
})
export class BoardsModule {}
