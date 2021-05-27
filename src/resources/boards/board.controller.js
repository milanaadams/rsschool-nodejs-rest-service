const boardService = require('./board.service');

const getAll = async (req, res, next) => {
  try {
    const board = await boardService.getAll();
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const getById = async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const createBoard = async (req, res, next) => {
  try {
    const board = await boardService.createBoard(req.body);
    res.status(201).json(board);
  } catch(err) {
    next(err);
  }
}

const updateBoard = async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch(err) {
    next(err);
  }
}

const deleteBoard = async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
