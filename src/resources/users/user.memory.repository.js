const DB = require('../../utils/dbUtils');
const TASK = require('../tasks/task.memory.repository');
const { NotFoundError } = require('../../errors/notFound');


const TABLE_NAME = 'Users';

/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities 
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * Gets user by id from DB
 * @param {uuidv4} id user id
 * @returns {User} User instance
 */
const getById = async (id) => {
  const user = await DB.getEntity(TABLE_NAME, id);
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}

/**
 * Saves new user to the DB
 * @param {User} user User instance
 * @returns {User} User instance
 */
const createUser = async (user) => DB.createEntity(TABLE_NAME, user);

/**
 * Updates specified user
 * @param {uuidv4} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);

/**
 * Removes user from a database by user id
 * @param {uuidv4} id User's id to be deleted
 * @returns {void}
 */
const deleteUser = async (id) => { 
  const user = await getById(id);
  if(user) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = await TASK.getAllByUser(id);
    if(tasks) {
      tasks.forEach((task) => {
        const updatedTask = task; 
        updatedTask.userId = null;
      })
    }
  }
}

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
