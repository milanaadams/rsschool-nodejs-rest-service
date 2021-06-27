import * as loginRepo from './login.memory.repository';
import { User } from '../users/user.model';

const authUser = async (user: User): Promise<User> => loginRepo.authUser(user); 

export { authUser };
