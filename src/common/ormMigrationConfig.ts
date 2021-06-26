import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

const migrationConnectionConfig = {
   type: 'postgres',
   host: 'localhost',
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

// this connection is for migration only
module.exports = migrationConnectionConfig;