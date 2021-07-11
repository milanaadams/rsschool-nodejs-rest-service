import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './common/ormconfig';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
import { WinstonModule } from 'nest-winston';
import { logger } from './logger/logger';
import { LoggerMiddleware } from './logger/loggerMiddleware';
import { APP_FILTER } from '@nestjs/core';
import { exceptionFilterWithLogger } from './exceptions/exceptionFilter';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
    WinstonModule.forRoot(logger),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: exceptionFilterWithLogger,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users', 'boards', 'login');
  }
}
