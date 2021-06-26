import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../boards/board.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;

}

@Entity('Columns')
export class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  order: number;

  @ManyToOne(() => Board, board => board.columns )
  board: Board;
  
}
