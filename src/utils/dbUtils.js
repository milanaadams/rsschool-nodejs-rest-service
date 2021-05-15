const { db } = require('./inMemoryDB');

function getAllEntities(tableName) {
  return db[tableName].filter(entry => entry);
}

function getEntity(tableName, id) {
  const entity = db[tableName].filter(entry => entry.id === id);
  return entity[0];
}

function createEntity(tableName, entity) {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
}

function updateEntity(tableName, id, entity) {
  const entityToUpdate = getEntity(tableName, id);
  if(entityToUpdate) {
    const entityIndex = db[tableName].indexOf(entityToUpdate);
    Object.assign(db[tableName][entityIndex], entity)
  }
  return getEntity(tableName, id);
}

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

function getAllEntitiesByBoardId(tableName, boardId) {
  const table = db[tableName];
  const entities = table.filter(entry => entry.boardId === boardId);
  return entities;
}

function getEntityByBoardId(tableName, boardId, id) {
  const entities = getAllEntitiesByBoardId(tableName, boardId);
  const entity = entities.filter(entry => entry.id === id)[0];
  return entity;
}

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