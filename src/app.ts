import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path  from 'path';
import * as YAML from 'yamljs';
import { Request, Response, NextFunction } from 'express';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { handleErrors } from './errors/handleErrors';
import { requestLogger } from './logging/request-logging';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(requestLogger);
app.use(handleErrors);

export { app };
