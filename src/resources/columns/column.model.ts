import * as uuid from 'uuid';

export interface IColumn {
  id: string;
  title: string;
  order: number;

}

export class Column implements IColumn {
  id: string;

  title: string;

  order: number;
  
  constructor({
    id = uuid.v4(),
    title = 'BOARD',
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
