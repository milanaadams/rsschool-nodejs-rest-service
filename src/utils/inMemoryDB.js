const  db = {
  Users: [],
  Boards: [],
  Tasks: [],
}

function getAllEntities(tableName) {
  return db[tableName].filter(task => task);
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

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity
}
