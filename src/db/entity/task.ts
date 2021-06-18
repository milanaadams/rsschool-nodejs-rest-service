import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;
  
  @Column()
  description: string;

  @Column()
  userId: string;

  @Column()
  boardId: string;

  @Column()
  columnId: string;
}
