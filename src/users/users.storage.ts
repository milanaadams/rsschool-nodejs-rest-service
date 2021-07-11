import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { IUserStorage } from './interfaces/IUserStorage.interface';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserStorage implements IUserStorage {
  async findAllUsers(): Promise<User[]> {
    const allUsers = await getRepository(User).find();
    return allUsers;
  }

  async findOneUser(id: string): Promise<User> {
    const user = await getRepository(User).findOne({ id });
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    await getRepository(User).save(newUser);
    return this.findOneUser(newUser.id);
  }

  async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findOneUser(id);
    if (userToUpdate) {
      await getRepository(User).update(userToUpdate, newUserInfo);
    }
    return this.findOneUser(id);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOneUser(id);
    if (user) {
      await getRepository(User).remove(user);
    }
    return user;
  }
}
