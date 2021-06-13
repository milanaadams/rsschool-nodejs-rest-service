import * as usersRepo from './user.memory.repository';
import { User, IUser } from './user.model';

const getAll = (): User[] => usersRepo.getAll();

const getById = (id: string): User => usersRepo.getById(id);

const createUser = (user: IUser): User => usersRepo.createUser(new User(user));

const updateUser = ( id: string, entity: IUser ): User => usersRepo.updateUser(id, entity);

const deleteUser = (id: string): void => usersRepo.deleteUser(id);

export { getAll, getById, createUser, updateUser, deleteUser };
