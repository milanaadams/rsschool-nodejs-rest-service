import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from '../users/users.module';
import * as config from '../common/config';
import { LoginStorage } from './login.storage';

@Module({
  controllers: [LoginController],
  providers: [LoginService, LoginStorage],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  exports: [LoginService, JwtModule],
})
export class LoginModule {}
