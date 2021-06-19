import { getRepository } from 'typeorm';
import { db, TableName, DBEntity, IDBEntity } from './inMemoryDB';
import { Task } from '../resources/tasks/task.model';
import { NotFoundError } from '../errors/notFound';
import {} from '../db/dbconnect'

function getAllEntities(tableName: TableName): DBEntity[] {
  const allEntities: DBEntity[] = db[tableName].filter((item: DBEntity) => item);
  return allEntities;
}

async function getEntity(tableName: TableName, entityId: string): Promise<DBEntity> {
  const requestedEntity: DBEntity = await getRepository(tableName).findOne({ id: entityId }) as DBEntity;
  if (!requestedEntity) throw new NotFoundError('Not found', 404);
  return requestedEntity;
}

async function createEntity(tableName: TableName, entity: DBEntity): Promise<DBEntity> {
  await getRepository(tableName).save(entity);
  return getEntity(tableName, entity.id);
}

async function updateEntity(tableName: TableName, id: string, entity: IDBEntity): Promise<DBEntity> {
  const entityToUpdate = getEntity(tableName, id);
  if(entityToUpdate) {
    const updatedEntity = Object.assign(entityToUpdate, entity);
    getRepository(tableName).save(updatedEntity);
  }
  return getEntity(tableName, id);
}

async function deleteEntity(tableName: TableName, id: string): Promise<DBEntity> {
  const entity = await getEntity(tableName, id);
  if(entity) {
    await getRepository(tableName).remove(entity);
  }
  return entity;
}

async function getAllEntitiesByBoardId(tableName: TableName, boardId: string): Promise<DBEntity[]> {
  const table = db[tableName];
  const entities = table.filter((entry: Task) => entry.boardId === boardId);
  return entities;
}

async function getEntityByBoardId(tableName: TableName, boardId: string, entityId: string): Promise<DBEntity> {
  // const entities = getAllEntitiesByBoardId(tableName, boardId);
  const entity = await getRepository(tableName).findOne({ id: entityId }) as DBEntity;
  return entity;
}

async function getAllEntitiesByUserId(tableName: TableName, userId: string): Promise<DBEntity[]> {
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
