const DB = require('../../utils/inMemoryDB');
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
const deleteUser = async (id) => DB.deleteEntity(TABLE_NAME, id);

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
