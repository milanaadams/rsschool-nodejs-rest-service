import * as DB from '../../utils/dbUtils';
import { Column, IColumn } from './column.model';

const TABLE_NAME = 'Columns';

const createColumn = async (columns: IColumn[]): Promise<void> => {
  columns.forEach(async (col) => {
    await DB.createEntity(TABLE_NAME, new Column(col)) as unknown as Column;
  })
};

export { createColumn };