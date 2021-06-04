import { db, TableName, DBEntity, IDBEntity } from './inMemoryDB';
import { Task } from '../resources/tasks/task.model';
import { NotFoundError } from '../errors/notFound';

function getAllEntities(tableName: TableName): DBEntity[] {
  const allEntities: DBEntity[] = db[tableName].filter((item: DBEntity) => item);
  return allEntities;
}

function getEntity(tableName: TableName, id: string): DBEntity {
  const entity: DBEntity[] = db[tableName].filter((entry: DBEntity) => entry.id === id);
  if (!entity.length) throw new NotFoundError('Not found', 404);
  return entity[0];
}

function createEntity(tableName: TableName, entity: DBEntity): DBEntity {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
}

function updateEntity(tableName: TableName, id: string, entity: IDBEntity): DBEntity {
  const entityToUpdate = getEntity(tableName, id);
  if(entityToUpdate) {
    const entityIndex = db[tableName].indexOf(entityToUpdate);
    Object.assign(db[tableName][entityIndex], entity)
  }
  return getEntity(tableName, id);
}

function deleteEntity(tableName: TableName, id: string): DBEntity {
  const table = db[tableName];
  const entity = getEntity(tableName, id);
  if(entity) {
    const entityIndex = table.indexOf(entity);
    table[entityIndex] = null;
    db[tableName] = table.filter((entry: DBEntity) => entry);
  }
  return entity;
}

function getAllEntitiesByBoardId(tableName: TableName, boardId: string): DBEntity[] {
  const table = db[tableName];
  const entities = table.filter((entry: Task) => entry.boardId === boardId);
  return entities;
}

function getEntityByBoardId(tableName: TableName, boardId: string, id: string): DBEntity {
  const entities = getAllEntitiesByBoardId(tableName, boardId);
  const entity = entities.filter(entry => entry.id === id)[0];
  return entity;
}

function getAllEntitiesByUserId(tableName: TableName, userId: string): DBEntity[] {
  const table = db[tableName];
  const entities: DBEntity[] = table.filter((entry: Task) => entry.userId === userId);
  return entities;
}

export {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  getAllEntitiesByBoardId,
  getEntityByBoardId,
  getAllEntitiesByUserId
}
