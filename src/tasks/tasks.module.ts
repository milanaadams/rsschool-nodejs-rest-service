import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskStorage } from './tasks.storage';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskStorage],
  imports: [forwardRef(() => LoginModule)],
})
export class TasksModule {}
