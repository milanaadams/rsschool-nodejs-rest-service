import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Columns } from '../columns/column.model';

export interface IBoard {
  id: string;
  title: string;
  columns?: Columns[];
}

@Entity('Boards')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, column => column.board, { eager: true, cascade: true } )
  @JoinTable()
  columns: Columns[];

}
