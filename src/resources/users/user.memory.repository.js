const DB = require('../../utils/dbUtils');
const TASK = require('../tasks/task.memory.repository');
const { NotFoundError } = require('../../errors/notFound');


const TABLE_NAME = 'Users';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async (id) => {
  const user = await DB.getEntity(TABLE_NAME, id);
  if(!user) throw new NotFoundError(`No user with id ${id}`, 404);
  return user;
}
const createUser = async (user) => DB.createEntity(TABLE_NAME, user);
const updateUser = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
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
