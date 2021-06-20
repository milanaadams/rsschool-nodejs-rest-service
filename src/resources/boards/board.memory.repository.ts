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

const createBoard = async (board: IBoard): Promise<Board> => await DB.createEntity(TABLE_NAME, board) as unknown as Board;

const updateBoard = async (id: string, entity: IBoard): Promise<Board> => await DB.updateEntity(TABLE_NAME, id, entity) as unknown as Board;

const deleteBoard = async (id: string): Promise<void> => {
  const board = await getById(id);
  if(board) {
    await DB.deleteEntity(TABLE_NAME, id);
    const tasks = await TASK.getAll(id);
    if(tasks) {
      tasks.forEach(async (task) => {
        const updatedTask = Object.assign(task, {boardId: null});
        await DB.updateEntity('Tasks', task.id, updatedTask);
      });
    }
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };