import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardEntity } from './board';

@Entity('Columns')
export class BoardColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, board => board.columns, { cascade: true })
  board: BoardEntity;
}
