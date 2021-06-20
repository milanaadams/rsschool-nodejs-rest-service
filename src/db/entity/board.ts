import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardColumnEntity } from './column';

@Entity('Boards')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: string;

  @OneToMany(() => BoardColumnEntity, column => column.board, { primary: true })
    column: BoardColumnEntity[];
}
