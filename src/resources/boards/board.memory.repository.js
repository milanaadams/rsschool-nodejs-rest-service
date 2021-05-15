const DB = require('../../utils/inMemoryDB');
const TASK = require('../tasks/task.memory.repository');
const { NotFoundError } = require('../../errors/notFound');

const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);
const getById = async (id) => {
  const board = DB.getEntity(TABLE_NAME, id);
  if (!board) throw new NotFoundError(`Board with id ${id} not found`, 404);
  return board;
}
const createBoard = async (board) => DB.createEntity(TABLE_NAME, board);
const updateBoard = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
const deleteBoard = async (id) => {
  const board = await getById(id);
  if(board) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = await TASK.getAll(id);
    if(tasks) {
      tasks.forEach((task) => TASK.deleteTask(task.id));
    }
  }
}

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
