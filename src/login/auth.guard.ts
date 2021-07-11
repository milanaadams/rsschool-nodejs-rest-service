import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  HttpStatus,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const bearer = authHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      this.jwtService.verify(bearerToken);
      return true;
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
