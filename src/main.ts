import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDefaultAdmin } from './utils/createAdmin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  createDefaultAdmin();
}
bootstrap();
