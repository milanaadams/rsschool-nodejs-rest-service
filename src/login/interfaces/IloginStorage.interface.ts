import { User } from '../../users/entities/user.entity';

export interface ILoginStorage {
  findOneUser: (user: User) => Promise<User>;
}
