const DB = require('../../utils/inMemoryDB');
const { NotFoundError } = require('../../errors/notFound');

const TABLE_NAME = 'Tasks';

const getAll = async (id) => DB.getAllEntitiesByBoardId(TABLE_NAME, id);
const getById = async (boardId, id) => {
  const task = DB.getEntityByBoardId(TABLE_NAME, boardId, id);
  if (!task) throw new NotFoundError(`No task with id ${id}`, 404);
  return task;
}
const createTask = async (task) => DB.createEntity(TABLE_NAME, task);
const updateTask = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
const deleteTask = async (id) => DB.deleteEntity(TABLE_NAME, id);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
