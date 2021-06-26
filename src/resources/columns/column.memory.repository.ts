import { getRepository } from 'typeorm';
import { BoardColumn } from './column.model';

const getById = async (id: string): Promise<BoardColumn> => getRepository(BoardColumn).findOne({ id });

// const getAllBoardColumns = async (boardId: string): Promise<BoardColumn[]> => getRepository(BoardColumn).find({ boardId });

const createColumn = async (columns: BoardColumn[]): Promise<void> => {
  columns.forEach(async(col): Promise<BoardColumn> => {
    const newCol = await getRepository(BoardColumn).save(col);
    return newCol;
  });
}

const updateColumn = async (columnId: string, updatedColumnInfo: BoardColumn): Promise<void> => {
  const columnToUpdate = await getById(columnId);
  if(columnToUpdate) {
    await getRepository(BoardColumn).update(columnToUpdate, updatedColumnInfo);
  }
}

export { createColumn, updateColumn };