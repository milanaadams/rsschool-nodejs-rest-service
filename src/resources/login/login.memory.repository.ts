import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from '../../errors/notFound';
import { User } from '../users/user.model';

const checkPass = async(password: string, hash: string): Promise<boolean> => bcrypt.compareSync(password, hash);

const authUser = async (user: User): Promise<User> => {
  const requestedUser = await getRepository(User).findOne({ login: user.login });
  if (!requestedUser) {
    throw new NotFoundError('No such user', 403);
  }
  const pass = checkPass(user.password, requestedUser.password);
  if(!pass) {
    throw new NotFoundError('Username and/or password do not match', 403);
  }
  return requestedUser;
}

export { authUser };
