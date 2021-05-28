const usersRepo = require('./user.memory.repository');
const User = require('./user.model')

/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities 
 */
const getAll = () => usersRepo.getAll();

/**
 * Gets user by id from DB
 * @param {uuidv4} id user id
 * @returns {User} User instance
 */
const getById = id => usersRepo.getById(id);

/**
 * Creates new User instance and saves new user to the DB
 * @param {object} user object with user attributes
 * @returns {User} User instance
 */
const createUser = user => usersRepo.createUser(new User(user));

/**
 * Updates specified user
 * @param {uuidv4} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = ( id, entity ) => usersRepo.updateUser(id, entity);

/**
 * Removes user from a database by user id
 * @param {uuidv4} id User's id to be deleted
 * @returns {void}
 */
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
