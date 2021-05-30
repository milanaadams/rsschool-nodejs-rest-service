"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getById = exports.getAll = void 0;
const DB = require("../../utils/dbUtils");
const TASK = require("../tasks/task.memory.repository");
const notFound_1 = require("../../errors/notFound");
const TABLE_NAME = 'Users';
/**
 * Gets all users from the DB
 * @returns {User[]} array of User entities
 */
const getAll = () => DB.getAllEntities(TABLE_NAME);
exports.getAll = getAll;
/**
 * Gets user by id from DB
 * @param {string} id user id
 * @returns {User} User instance
 */
const getById = (id) => {
    const user = DB.getEntity(TABLE_NAME, id);
    if (!user)
        throw new notFound_1.NotFoundError(`No user with id ${id}`, 404);
    return user;
};
exports.getById = getById;
/**
 * Saves new user to the DB
 * @param {User} user User instance
 * @returns {User} User instance
 */
const createUser = (user) => DB.createEntity(TABLE_NAME, user);
exports.createUser = createUser;
/**
 * Updates specified user
 * @param {string} id user id
 * @param {object} entity object with properties to be updated
 * @returns {User} updated User instance
 */
const updateUser = (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);
exports.updateUser = updateUser;
/**
 * Removes user from a database by user id
 * @param {string} id User's id to be deleted
 * @returns {void}
 */
const deleteUser = (id) => {
    const user = getById(id);
    if (user) {
        DB.deleteEntity(TABLE_NAME, id);
        const tasks = TASK.getAllByUser(id);
        if (tasks) {
            tasks.forEach((task) => {
                const updatedTask = task;
                updatedTask.userId = null;
            });
        }
    }
};
exports.deleteUser = deleteUser;
