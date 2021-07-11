import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ILoginStorage } from './interfaces/IloginStorage.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginStorage implements ILoginStorage {
  async findOneUser(user: LoginDto): Promise<User> {
    const requestedUser = await getRepository(User).findOne({
      login: user.login,
    });
    if (!requestedUser) {
      throw new HttpException(
        'User and password do not match',
        HttpStatus.FORBIDDEN,
      );
    }
    const pass = await bcrypt.compare(user.password, requestedUser.password);
    if (!pass) {
      throw new HttpException(
        'User and password do not match',
        HttpStatus.FORBIDDEN,
      );
    }
    return requestedUser;
  }
}
