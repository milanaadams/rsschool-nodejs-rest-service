const User = require('./user.model');
const usersService = require('./user.service');

const getAll = async(req, res, next) => {
  try{
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch(err) {
    next(err);
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch(err) {
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
