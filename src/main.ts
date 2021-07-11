import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDefaultAdmin } from './utils/createAdmin';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as config from './common/config';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';

async function bootstrap() {
  let app: INestApplication;
  if (config.USE_FASTIFY) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }
  await app.listen(4000);
  createDefaultAdmin();
}
bootstrap();
