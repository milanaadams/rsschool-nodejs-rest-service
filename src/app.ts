import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as cors from 'cors';
import * as path  from 'path';
import * as YAML from 'yamljs';
import { Request, Response, NextFunction } from 'express';
import { router as loginRouter } from './resources/login/login.router';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { handleErrors } from './errors/handleErrors';
import { requestLogger, errorLogger } from './logging/logger';
import { getInvalidRoute } from './middleware/handleInvalidRoute';
import { handleExceptions } from './errors/handleExceptions';
import { verifyToken } from './middleware/verifyToken';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requestLogger);
app.use('/login', loginRouter);
app.use(verifyToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(getInvalidRoute);
app.use(handleErrors);
app.use(errorLogger);

process.on('uncaughtException', (err) => { handleExceptions(err, 'Uncaught Exception detected') });
// throw Error('Oops!');
process.on('unhandledRejection', (err: Error) => { handleExceptions(err, 'Unhandled Promise Rejection detected') });
// Promise.reject(Error('Oops!'));
export { app };
