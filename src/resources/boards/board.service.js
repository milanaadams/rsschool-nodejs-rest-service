const boardRepo = require('./board.memory.repository');
const Board = require('./board.model')

const getAll = () => boardRepo.getAll();
const getById = id => boardRepo.getById(id);
const createBoard = board => boardRepo.createBoard(new Board(board));
const updateBoard = ( id, entity ) => boardRepo.updateBoard(id, entity);
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
