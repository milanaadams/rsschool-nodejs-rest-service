"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller = require("./user.controller");
const router = express_1.Router();
exports.router = router;
router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createUser);
router.route('/:id').put(controller.updateUser);
router.route('/:id').delete(controller.deleteUser);