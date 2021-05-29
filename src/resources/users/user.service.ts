import * as usersRepo from './user.memory.repository';
import { User, IUser } from './user.model';

/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities 
 */
const getAll = (): User[] => usersRepo.getAll();

/**
 * Gets user by id from DB
 * @param {string} id user id
 * @returns {User} User instance
 */
const getById = (id: string): User => usersRepo.getById(id);

/**
 * Creates new User instance and saves new user to the DB
 * @param {object} user object with user attributes
 * @returns {User} User instance
 */
const createUser = (user: IUser): User => usersRepo.createUser(new User(user));

/**
 * Updates specified user
 * @param {string} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = ( id: string, entity: IUser ): User => usersRepo.updateUser(id, entity);

/**
 * Removes user from a database by user id
 * @param {string} id User's id to be deleted
 * @returns {void}
 */
const deleteUser = (id: string): void => usersRepo.deleteUser(id);

export { getAll, getById, createUser, updateUser, deleteUser };
