import * as uuid from 'uuid';

interface IColumn {
  id: string;
  title: string;
  order: number;

}

export interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn>;
}

export class Board implements IBoard {
  id: string;

  title: string;

  columns: Array<IColumn>;
  
  constructor({
    id = uuid.v4(),
    title = 'BOARD',
    columns = [
      {
        id: uuid.v4(),
        title: 'COLUMN',
        order: 0
      }
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({id: uuid.v4(), ...column, }));
  }
}
