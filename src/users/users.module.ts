import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserStorage } from './users.storage';
import { TaskStorage } from '../tasks/tasks.storage';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserStorage, TaskStorage],
  imports: [forwardRef(() => LoginModule)],
})
export class UsersModule {}
