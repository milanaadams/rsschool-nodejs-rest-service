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

  @Column({ nullable: true })
  userId: string | null;

  @Column({ nullable: true })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string | null;
}
