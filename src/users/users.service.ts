import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserStorage } from './users.storage';
import { TaskStorage } from '../tasks/tasks.storage';

@Injectable()
export class UsersService {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly taskStorage: TaskStorage,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userStorage.createUser(createUserDto);
    return User.toResponse(newUser);
  }

  async findAll() {
    const allUsers = await this.userStorage.findAllUsers();
    const allUsersPartial = allUsers.map((user) => User.toResponse(user));
    return allUsersPartial;
  }

  async findOne(id: string) {
    return User.toResponse(await this.userStorage.findOneUser(id));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return User.toResponse(
      await this.userStorage.updateUser(id, updateUserDto),
    );
  }

  async remove(id: string) {
    const user = await this.userStorage.findOneUser(id);
    if (user) {
      const tasks = await this.taskStorage.findAllTasksByUser(user.id);
      if (tasks) {
        tasks.forEach(async (task) => {
          const updatedTask = Object.assign(task, { userId: null });
          await this.taskStorage.updateTask(task.id, updatedTask);
        });
      }
    }
    await this.userStorage.deleteUser(id);
  }
}
