import * as DB from '../../utils/dbUtils';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { User, IUser } from './user.model';
import { TableName } from '../../utils/inMemoryDB';


const TABLE_NAME: TableName = 'Users';

const getAll = (): User[] => DB.getAllEntities(TABLE_NAME) as User[];

const getById = (id: string): User => {
  const user: User = DB.getEntity(TABLE_NAME, id) as User;
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}

const createUser = (user: User): User => DB.createEntity(TABLE_NAME, user) as User;

const updateUser = (id: string, entity: IUser): User => DB.updateEntity(TABLE_NAME, id, entity) as User;

const deleteUser = (id: string): void => { 
  const user = getById(id);
  if(user) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = TASK.getAllByUser(id);
    if(tasks) {
      tasks.forEach((task) => {
        const updatedTask = task; 
        updatedTask.userId = null;
      })
    }
  }
}

export { getAll, getById, createUser, updateUser, deleteUser };
