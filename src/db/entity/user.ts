import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// import { Group } from './Group';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
