const { db } = require('./inMemoryDB');

/**
 * Returns all entities from the specified table
 * @param {string} tableName DB table name
 * @returns {object[]} Array of objects
 */
function getAllEntities(tableName) {
  return db[tableName].filter(entry => entry);
}

/**
 * Gets entity by its id from the specified table
 * @param {string} tableName DB table name
 * @param {uuidv4} id entity id
 * @returns {object} object with entity's properties
 */
function getEntity(tableName, id) {
  const entity = db[tableName].filter(entry => entry.id === id);
  return entity[0];
}

/**
 * Creates new entity and saves it to the specified table
 * @param {string} tableName DB table name
 * @param {object} entity object with entity's properties
 * @returns {object} object with entity's properties
 */
function createEntity(tableName, entity) {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
}

/**
 * Updates entity by its id in the specified table
 * @param {string} tableName DB table name
 * @param {uuidv4} id entity id
 * @param {object} entity entity's properties to be updated
 * @returns {object} updated object with entity's properties
 */
function updateEntity(tableName, id, entity) {
  const entityToUpdate = getEntity(tableName, id);
  if(entityToUpdate) {
    const entityIndex = db[tableName].indexOf(entityToUpdate);
    Object.assign(db[tableName][entityIndex], entity)
  }
  return getEntity(tableName, id);
}

/**
 * Remove entity from the specified table
 * @param {string} tableName DB table name
 * @param {uuidv4} id entity id
 * @returns {object} deleted entity
 */
function deleteEntity(tableName, id) {
  const table = db[tableName];
  const entity = getEntity(tableName, id);
  if(entity) {
    const entityIndex = table.indexOf(entity);
    table[entityIndex] = null;
    db[tableName] = table.filter(entry => entry);
  }
  return entity;
}

/**
 * Returns all entities from specified table with given boardId
 * @param {string} tableName DB table name
 * @param {uuidv4} boardId board id
 * @returns {object[]} Array of entities wuth the speified boardId
 */
function getAllEntitiesByBoardId(tableName, boardId) {
  const table = db[tableName];
  const entities = table.filter(entry => entry.boardId === boardId);
  return entities;
}

/**
 * Get entity from a specified table by id and boardId
 * @param {string} tableName DB table name
 * @param {uuidv4} boardId board id
 * @param {uuidv4} id entity id
 * @returns {object} entity from the specified table
 */
function getEntityByBoardId(tableName, boardId, id) {
  const entities = getAllEntitiesByBoardId(tableName, boardId);
  const entity = entities.filter(entry => entry.id === id)[0];
  return entity;
}

/**
 * Get all entities from the specified table by user id
 * @param {string} tableName DB table name
 * @param {uuidv4} userId user id
 * @returns {object} entity that includes the specified user id
 */
function getAllEntitiesByUserId(tableName, userId) {
  const table = db[tableName];
  const entities = table.filter(entry => entry.userId === userId);
  return entities;
}

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  getAllEntitiesByBoardId,
  getEntityByBoardId,
  getAllEntitiesByUserId
}