import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { PORT } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET_KEY } = process.env;
const AUTH_MODE = process.env.AUTH_MODE === 'true';

const USE_FASTIFY = process.env.USE_FASTIFY === 'true';

export { PORT, NODE_ENV, JWT_SECRET_KEY, AUTH_MODE, USE_FASTIFY };
