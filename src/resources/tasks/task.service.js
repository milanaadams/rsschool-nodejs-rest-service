const taskRepo = require('./task.memory.repository');
const Task = require('./task.model')

const getAll = (id) => taskRepo.getAll(id);
const getById = (boardId, id) => taskRepo.getById(boardId, id);
const createTask = task => taskRepo.createTask(new Task(task));
const updateTask = ( id, entity ) => taskRepo.updateTask(id, entity);
const deleteTask = id => taskRepo.deleteTask(id);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
