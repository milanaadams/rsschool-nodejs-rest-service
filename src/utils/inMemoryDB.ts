import { User, IUser } from '../resources/users/user.model';
import { Board, IBoard } from '../resources/boards/board.model';
import { Task, ITask } from '../resources/tasks/task.model';
import { BoardColumn, IColumn } from '../resources/columns/column.model';

type TableName = 'Users' | 'Boards' | 'Tasks' | 'Columns';

type DBEntity = User | Board | Task | BoardColumn;
type IDBEntity = IUser | IBoard | ITask | IColumn;

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
