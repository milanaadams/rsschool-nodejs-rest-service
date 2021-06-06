import * as uuid from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

type UserResponse = Pick<IUser, 'id' | 'name' | 'login'>;

export class User implements IUser {
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

  /**
   * Generates object from the User instance excluding sensetive information such as password
   * @param {User} user 
   * @returns {object}
   */
  static toResponse(user: User): UserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
