"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getById = exports.getAll = void 0;
const boardService = require("./board.service");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield boardService.getAll();
        res.json(board);
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield boardService.getById(req.params.id);
        res.json(board);
    }
    catch (err) {
        next(err);
    }
});
exports.getById = getById;
const createBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield boardService.createBoard(req.body);
        res.status(201).json(board);
    }
    catch (err) {
        next(err);
    }
});
exports.createBoard = createBoard;
const updateBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield boardService.updateBoard(req.params.id, req.body);
        res.json(board);
    }
    catch (err) {
        next(err);
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield boardService.deleteBoard(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBoard = deleteBoard;
