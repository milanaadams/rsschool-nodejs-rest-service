import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoReconnect: true,
  reconnectionInterval: 1000,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migration/**/*.ts'],
  cli: {
    migrationsDir: 'dist/db/migration',
  },
} as unknown as ConnectionOptions;

export = config;
