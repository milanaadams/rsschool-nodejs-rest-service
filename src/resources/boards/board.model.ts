import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { BoardColumn } from '../columns/column.model';

export interface IBoard {
  id: string;
  title: string;
  columns?: BoardColumn[];
}

@Entity('Boards')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, column => column.board, { eager: true, cascade: true } )
  @JoinTable()
  columns: BoardColumn[];

}
