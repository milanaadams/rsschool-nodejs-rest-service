import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

export const config = {
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
  entities: [
     'src/resources/**/*.model{.ts,.js}'
  ],
  migrations: [
     'src/db/migration/**/*.ts'
  ],
  cli: {
   "migrationsDir": 'src/db/migration'
   }

} as unknown as ConnectionOptions;
