const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks);
  } catch(err) {
    next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.boardId, req.params.id);
    res.json(task);
  } catch(err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    req.body.boardId = req.params.boardId;
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch(err) {
    next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
