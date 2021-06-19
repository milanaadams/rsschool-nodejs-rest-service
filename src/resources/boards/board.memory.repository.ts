import * as DB from '../../utils/dbUtils';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { Board, IBoard } from './board.model';

const TABLE_NAME = 'Boards';

const getAll = (): Board[] => DB.getAllEntities(TABLE_NAME) as unknown as Board[];

const getById = (id: string): Board => {
  const board = DB.getEntity(TABLE_NAME, id) as unknown as Board;
  if (!board) throw new NotFoundError(`Board with id ${id} not found`, 404);
  return board;
}

const createBoard = (board: IBoard): Board => DB.createEntity(TABLE_NAME, board) as unknown as Board;

const updateBoard = (id: string, entity: IBoard): Board => DB.updateEntity(TABLE_NAME, id, entity) as unknown as Board;

const deleteBoard = (id: string): void => {
  const board = getById(id);
  if(board) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = TASK.getAll(id);
    if(tasks) {
      tasks.forEach((task) => TASK.deleteTask(task.id));
    }
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };
