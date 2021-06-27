import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

@Entity('Tasks')
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;
  
  @Column()
  description: string;

  @Column({ nullable: true })
  userId: string | null;

  @Column({ nullable: true })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string | null;
}
