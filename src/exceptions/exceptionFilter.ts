import {
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { errorLogger } from '../logger/logger';

@Catch(HttpException)
export class exceptionFilterWithLogger implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const incoming = host.switchToHttp();
    const req = incoming.getRequest<Request>();
    const res = incoming.getResponse<Response>();
    const status = exception.getStatus();

    const err = {
      statusCode: status,
    };

    errorLogger(err, req, res);
    res.status(status).json(err);
  }
}
