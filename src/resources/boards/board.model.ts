import * as uuid from 'uuid';

export interface IBoard {
  id: string;
  title: string;
}

export class Board implements IBoard {
  id: string;

  title: string;
  
  constructor({
    id = uuid.v4(),
    title = 'BOARD',
  } = {}) {
    this.id = id;
    this.title = title;
  }
}
