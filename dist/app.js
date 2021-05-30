"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const path = require("path");
const YAML = require("yamljs");
const user_router_1 = require("./resources/users/user.router");
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
const handleErrors_1 = require("./errors/handleErrors");
const app = express();
exports.app = app;
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', user_router_1.router);
app.use('/boards', board_router_1.router);
app.use('/boards/:boardId/tasks', task_router_1.router);
app.use(handleErrors_1.handleErrors);
