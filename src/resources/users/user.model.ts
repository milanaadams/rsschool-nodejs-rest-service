import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

type UserResponse = Pick<IUser, 'id' | 'name' | 'login'>;

/* export class User1 implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
} */

@Entity('Users')
export class User implements IUser {
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
