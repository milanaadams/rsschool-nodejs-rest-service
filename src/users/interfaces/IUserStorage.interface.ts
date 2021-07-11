import { CreateUserDto } from './../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserStorage {
  findAllUsers: () => Promise<User[]>;
  findOneUser: (id: string) => Promise<User>;
  createUser: (userDto: CreateUserDto) => Promise<User>;
  updateUser: (id: string, updateUserDto: UpdateUserDto) => Promise<User>;
  deleteUser: (id: string) => Promise<User>;
}
