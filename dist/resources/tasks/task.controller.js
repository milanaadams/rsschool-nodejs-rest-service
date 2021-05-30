"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getById = exports.getAll = void 0;
const taskService = require("./task.service");
const getAll = (req, res, next) => {
    try {
        const tasks = taskService.getAll(req.params.boardId);
        res.json(tasks);
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getById = (req, res, next) => {
    try {
        const task = taskService.getById(req.params.boardId, req.params.id);
        res.json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.getById = getById;
const createTask = (req, res, next) => {
    try {
        req.body.boardId = req.params.boardId;
        const task = taskService.createTask(req.body);
        res.status(201).json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.createTask = createTask;
const updateTask = (req, res, next) => {
    try {
        const task = taskService.updateTask(req.params.id, req.body);
        res.json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => {
    try {
        taskService.deleteTask(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTask = deleteTask;
