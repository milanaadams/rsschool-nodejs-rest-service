"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getById = exports.getAll = void 0;
const user_model_1 = require("./user.model");
const usersService = require("./user.service");
const getAll = (req, res, next) => {
    try {
        const users = usersService.getAll();
        res.json(users.map(user_model_1.User.toResponse));
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getById = (req, res, next) => {
    try {
        const user = usersService.getById(req.params.id);
        res.json(user_model_1.User.toResponse(user));
    }
    catch (err) {
        next(err);
    }
};
exports.getById = getById;
const createUser = (req, res, next) => {
    try {
        const user = usersService.createUser(req.body);
        res.status(201).json(user_model_1.User.toResponse(user));
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
const updateUser = (req, res, next) => {
    try {
        const user = usersService.updateUser(req.params.id, req.body);
        res.json(user_model_1.User.toResponse(user));
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => {
    try {
        usersService.deleteUser(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
