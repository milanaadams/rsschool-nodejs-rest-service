const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const board = await boardService.getAll();
    res.json(board);
  } catch(err) {
    next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch(err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.createBoard(req.body);
    res.status(201).json(board);
  } catch(err) {
    next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch(err) {
    next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
