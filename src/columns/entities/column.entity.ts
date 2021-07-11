import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity('Columns')
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;
}
