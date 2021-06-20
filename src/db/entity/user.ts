import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
