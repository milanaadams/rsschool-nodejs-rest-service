import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from './board';

@Entity('Columns')
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, board => board.columns, { primary: true })
  @JoinColumn({ name: 'column_id' })
  board: Board;
}
