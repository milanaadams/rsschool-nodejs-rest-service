import { User, IUser } from '../resources/users/user.model';
import { Board, IBoard } from '../resources/boards/board.model';
import { Task, ITask } from '../resources/tasks/task.model';

type TableName = 'Users' | 'Boards' | 'Tasks';

type DBEntity = User | Board | Task;
type IDBEntity = IUser | IBoard | ITask;

type DataBase = {
  Users: Array<DBEntity>,
  Boards: Array<DBEntity>,
  Tasks: Array<DBEntity>,
}

const  db: DataBase = {
  Users: [],
  Boards: [],
  Tasks: [],
}

export {
  db,
  TableName,
  DBEntity,
  IDBEntity
}
