import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardColumn } from './column';

@Entity('Boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: string;

  @OneToMany(() => BoardColumn, column => column.board, { primary: true })
    column: BoardColumn[];
}
