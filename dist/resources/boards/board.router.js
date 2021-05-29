"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller = require("./board.controller");
const router = express_1.Router();
exports.router = router;
router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getById);
router.route('/').post(controller.createBoard);
router.route('/:id').put(controller.updateBoard);
router.route('/:id').delete(controller.deleteBoard);