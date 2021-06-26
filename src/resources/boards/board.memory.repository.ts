import { getRepository } from 'typeorm';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { Board, IBoard } from './board.model';
import * as COLUMNS from '../columns/column.memory.repository';

const getAll = async (): Promise<Board[]> => getRepository(Board).find();

const getById = async(id: string): Promise<Board> => {
  const board = await getRepository(Board).findOne({ id });
  if (!board) throw new NotFoundError(`Board with id ${id} not found`, 404);
  return board;
}

const createBoard = async (board: Board): Promise<Board> => {
  const newBoard = await getRepository(Board).save(board);
  if(board.columns.length) {
    await COLUMNS.createColumn(board.columns, newBoard.id);
  }
  return getById(newBoard.id);
}

const updateBoard = async (id: string, updatedBoardInfo: IBoard): Promise<Board> => {
  const boardToUpdate = await getById(id);
  if(boardToUpdate) {
    const { id, title } = updatedBoardInfo;
    await getRepository(Board).update({ id }, {id, title});
  }
  return getById(id);
}

const deleteBoard = async (id: string): Promise<void> => {
  const board = await getById(id);
  if(board) {
    const tasks = await TASK.getAll(id);
    if(tasks) {
      tasks.forEach(async (task) => {
        const updatedTask = Object.assign(task, {boardId: null});
        await TASK.updateTask(task.id, updatedTask);
      });

    const columns = await COLUMNS.getAllBoardColumns(id);
    if(columns) {
      columns.forEach(async (col) => {
        const updatedColumn = Object.assign(col, { boardId: null});
        await COLUMNS.updateColumn(col.id, updatedColumn);
      })
    }
    }
    await getRepository(Board).remove(board);
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };
