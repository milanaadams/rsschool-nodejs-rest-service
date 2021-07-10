import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserResponse } from '../dto/create-user.dto';

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

  static toResponse(user: User): UserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
