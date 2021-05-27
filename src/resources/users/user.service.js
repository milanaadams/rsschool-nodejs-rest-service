const usersRepo = require('./user.memory.repository');
const User = require('./user.model')

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const createUser = user => usersRepo.createUser(new User(user));
const updateUser = ( id, entity ) => usersRepo.updateUser(id, entity);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
