import { getRepository } from 'typeorm';
import { Columns } from './column.model';

const getById = async (id: string): Promise<Columns> => getRepository(Columns).findOne({ id });

// const getAllBoardColumns = async (boardId: string): Promise<BoardColumn[]> => getRepository(BoardColumn).find({ boardId });

const createColumn = async (columns: Columns[]): Promise<void> => {
  columns.forEach(async(col): Promise<Columns> => {
    const newCol = await getRepository(Columns).save(col);
    return newCol;
  });
}

const updateColumn = async (columnId: string, updatedColumnInfo: Columns): Promise<void> => {
  const columnToUpdate = await getById(columnId);
  if(columnToUpdate) {
    await getRepository(Columns).update(columnToUpdate, updatedColumnInfo);
  }
}

export { createColumn, updateColumn };