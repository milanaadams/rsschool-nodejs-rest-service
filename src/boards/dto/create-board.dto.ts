import { Columns } from '../../columns/entities/column.entity';

export class CreateBoardDto {
  id: string;
  title: string;
  columns?: Columns[];
}
