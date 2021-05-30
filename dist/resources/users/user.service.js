"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getById = exports.getAll = void 0;
const usersRepo = require("./user.memory.repository");
const user_model_1 = require("./user.model");
/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities
 */
const getAll = () => usersRepo.getAll();
exports.getAll = getAll;
/**
 * Gets user by id from DB
 * @param {string} id user id
 * @returns {User} User instance
 */
const getById = (id) => usersRepo.getById(id);
exports.getById = getById;
/**
 * Creates new User instance and saves new user to the DB
 * @param {object} user object with user attributes
 * @returns {User} User instance
 */
const createUser = (user) => usersRepo.createUser(new user_model_1.User(user));
exports.createUser = createUser;
/**
 * Updates specified user
 * @param {string} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = (id, entity) => usersRepo.updateUser(id, entity);
exports.updateUser = updateUser;
/**
 * Removes user from a database by user id
 * @param {string} id User's id to be deleted
 * @returns {void}
 */
const deleteUser = (id) => usersRepo.deleteUser(id);
exports.deleteUser = deleteUser;
