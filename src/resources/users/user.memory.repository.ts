import * as DB from '../../utils/dbUtils';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { User, IUser } from './user.model';
import { TableName } from '../../utils/inMemoryDB';


const TABLE_NAME: TableName = 'Users';

const getAll = async (): Promise<User[]> => await DB.getAllEntities(TABLE_NAME) as User[];

const getById = async (id: string): Promise<User> => {
  const user: User = await DB.getEntity(TABLE_NAME, id) as unknown as User;
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}

const createUser = async (user: User): Promise<User> => await DB.createEntity(TABLE_NAME, user) as unknown as User;

const updateUser = async (id: string, entity: IUser): Promise<User> => await DB.updateEntity(TABLE_NAME, id, entity) as unknown as User;

const deleteUser = async (id: string): Promise<void> => { 
  const user = getById(id);
  if(user) {
    DB.deleteEntity(TABLE_NAME, (await user).id);
    const tasks = await TASK.getAllByUser((await user).id);
    if(tasks) {
      tasks.forEach(async (task) => {
        const updatedTask = Object.assign(task, {userId: null});
        await DB.updateEntity('Tasks', task.id, updatedTask);
      })
    }
  }
}

export { getAll, getById, createUser, updateUser, deleteUser };

