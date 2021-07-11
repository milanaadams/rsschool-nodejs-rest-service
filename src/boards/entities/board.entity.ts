import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Columns } from '../../columns/entities/column.entity';

@Entity('Boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, (column) => column.board, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  columns: Columns[];
}
