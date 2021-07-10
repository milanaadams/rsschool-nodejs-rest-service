import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserStorage } from './users.storage';
import { TaskStorage } from '../tasks/tasks.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserStorage, TaskStorage],
})
export class UsersModule {}
