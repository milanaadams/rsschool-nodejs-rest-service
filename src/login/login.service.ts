import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginStorage } from './login.storage';

@Injectable()
export class LoginService {
  constructor(
    private readonly loginStorage: LoginStorage,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.loginStorage.findOneUser(loginDto);
    const payload = { id: user.id, login: user.login };
    if (user) {
      return {
        token: this.jwtService.sign(payload),
      };
    }
    return { token: 'none' };
  }
}
