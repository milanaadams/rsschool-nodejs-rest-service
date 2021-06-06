import * as DB from '../../utils/dbUtils';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { User, IUser } from './user.model';
import { TableName } from '../../utils/inMemoryDB';


const TABLE_NAME: TableName = 'Users';

/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities 
 */
const getAll = (): User[] => DB.getAllEntities(TABLE_NAME) as User[];

/**
 * Gets user by id from DB
 * @param {string} id user id
 * @returns {User} User instance
 */
const getById = (id: string): User => {
  const user: User = DB.getEntity(TABLE_NAME, id) as User;
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}

/**
 * Saves new user to the DB
 * @param {User} user User instance
 * @returns {User} User instance
 */
const createUser = (user: User): User => DB.createEntity(TABLE_NAME, user) as User;

/**
 * Updates specified user
 * @param {string} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = (id: string, entity: IUser): User => DB.updateEntity(TABLE_NAME, id, entity) as User;

/**
 * Removes user from a database by user id
 * @param {string} id User's id to be deleted
 * @returns {void}
 */
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
