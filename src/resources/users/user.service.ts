import * as usersRepo from './user.memory.repository';
import { User, IUser } from './user.model';

const getAll = async (): Promise<User[]> => usersRepo.getAll();

const getById = async (id: string): Promise<User> => usersRepo.getById(id);

const createUser = async (user: IUser): Promise<User> => usersRepo.createUser(new User(user));

const updateUser = async ( id: string, entity: IUser ): Promise<User> => usersRepo.updateUser(id, entity);

const deleteUser = async (id: string): Promise<void> => usersRepo.deleteUser(id);

export { getAll, getById, createUser, updateUser, deleteUser };
