import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { User, IUser } from './user.model';

const getAll = async (): Promise<User[]> => {
  const allEntities = getRepository(User).find();
  return allEntities;
}

const getById = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne({ id })
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}

const createUser = async (newUser: User): Promise<User> => {
  await getRepository(User).save(newUser);
  return getById(newUser.id);
}

const updateUser = async (id: string, newUserInfo: IUser): Promise<User> => {
  const userToUpdate = await getById(id);
  if(userToUpdate) {
    await getRepository(User).update(userToUpdate, newUserInfo);
  }
  return getById(userToUpdate.id);
}

const deleteUser = async (id: string): Promise<void> => {
  const user = await getById(id);
  if(user) {
    const tasks = await TASK.getAllByUser(user.id);
    if(tasks) {
      tasks.forEach(async (task) => {
        const updatedTask = Object.assign(task, {userId: null});
        await TASK.updateTask(task.id, updatedTask);
      })
    }
    await getRepository(User).remove(user);
  }
}

const checkPass = async(password: string, hash: string): Promise<boolean> => bcrypt.compareSync(password, hash);

const authUser = async (user: User): Promise<User> => {
  const requestedUser = await getRepository(User).findOne({ login: user.login });
  if (!requestedUser) {
    throw new Error('Username and/or password do not match');
  }
  const pass = checkPass(user.password, requestedUser.password);
  if(!pass) {
    throw new Error('Username and/or password do not match');
  }
  return requestedUser;
}

export { getAll, getById, createUser, updateUser, deleteUser, authUser };
