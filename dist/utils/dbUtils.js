"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntitiesByUserId = exports.getEntityByBoardId = exports.getAllEntitiesByBoardId = exports.deleteEntity = exports.updateEntity = exports.createEntity = exports.getEntity = exports.getAllEntities = void 0;
const inMemoryDB_1 = require("./inMemoryDB");
/**
 * Returns all entities from the specified table
 * @param {string} tableName DB table name
 * @returns {object[]} Array of objects
 */
function getAllEntities(tableName) {
    const allEntities = inMemoryDB_1.db[tableName].filter((item) => item);
    return allEntities;
}
exports.getAllEntities = getAllEntities;
/**
 * Gets entity by its id from the specified table
 * @param {string} tableName DB table name
 * @param {string} id entity id
 * @returns {object} object with entity's properties
 */
function getEntity(tableName, id) {
    const entity = inMemoryDB_1.db[tableName].filter((entry) => entry.id === id);
    return entity[0];
}
exports.getEntity = getEntity;
/**
 * Creates new entity and saves it to the specified table
 * @param {string} tableName DB table name
 * @param {object} entity object with entity's properties
 * @returns {object} object with entity's properties
 */
function createEntity(tableName, entity) {
    inMemoryDB_1.db[tableName].push(entity);
    return getEntity(tableName, entity.id);
}
exports.createEntity = createEntity;
/**
 * Updates entity by its id in the specified table
 * @param {string} tableName DB table name
 * @param {string} id entity id
 * @param {object} entity entity's properties to be updated
 * @returns {object} updated object with entity's properties
 */
function updateEntity(tableName, id, entity) {
    const entityToUpdate = getEntity(tableName, id);
    if (entityToUpdate) {
        const entityIndex = inMemoryDB_1.db[tableName].indexOf(entityToUpdate);
        Object.assign(inMemoryDB_1.db[tableName][entityIndex], entity);
    }
    return getEntity(tableName, id);
}
exports.updateEntity = updateEntity;
/**
 * Remove entity from the specified table
 * @param {string} tableName DB table name
 * @param {string} id entity id
 * @returns {object} deleted entity
 */
function deleteEntity(tableName, id) {
    const table = inMemoryDB_1.db[tableName];
    const entity = getEntity(tableName, id);
    if (entity) {
        const entityIndex = table.indexOf(entity);
        table[entityIndex] = null;
        inMemoryDB_1.db[tableName] = table.filter((entry) => entry);
    }
    return entity;
}
exports.deleteEntity = deleteEntity;
/**
 * Returns all entities from specified table with given boardId
 * @param {string} tableName DB table name
 * @param {string} boardId board id
 * @returns {object[]} Array of entities wuth the speified boardId
 */
function getAllEntitiesByBoardId(tableName, boardId) {
    const table = inMemoryDB_1.db[tableName];
    const entities = table.filter((entry) => entry.boardId === boardId);
    return entities;
}
exports.getAllEntitiesByBoardId = getAllEntitiesByBoardId;
/**
 * Get entity from a specified table by id and boardId
 * @param {string} tableName DB table name
 * @param {string} boardId board id
 * @param {string} id entity id
 * @returns {object} entity from the specified table
 */
function getEntityByBoardId(tableName, boardId, id) {
    const entities = getAllEntitiesByBoardId(tableName, boardId);
    const entity = entities.filter(entry => entry.id === id)[0];
    return entity;
}
exports.getEntityByBoardId = getEntityByBoardId;
/**
 * Get all entities from the specified table by user id
 * @param {string} tableName DB table name
 * @param {string} userId user id
 * @returns {object} entity that includes the specified user id
 */
function getAllEntitiesByUserId(tableName, userId) {
    const table = inMemoryDB_1.db[tableName];
    const entities = table.filter((entry) => entry.userId === userId);
    return entities;
}
exports.getAllEntitiesByUserId = getAllEntitiesByUserId;
