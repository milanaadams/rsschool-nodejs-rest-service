import { getRepository } from 'typeorm';
import { TableName, DBEntity, IDBEntity } from './inMemoryDB';
import { NotFoundError } from '../errors/notFound';
import {} from '../db/dbconnect';

function getAllEntities(tableName: TableName): DBEntity[] {
  const allEntities: DBEntity[] = getRepository(tableName).find() as unknown as DBEntity[];
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
  const entityToUpdate = await getEntity(tableName, id);
  if(entityToUpdate) {
    await getRepository(tableName).update(entityToUpdate, entity);
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

async function getAllEntitiesByBoardId(tableName: TableName, entityBoardId: string): Promise<DBEntity[]> {
  const entities = await getRepository(tableName).find({ boardId: entityBoardId }) as unknown as DBEntity[];
  return entities;
}

async function getEntityByBoardId(tableName: TableName, boardId: string, entityId: string): Promise<DBEntity> {
  const entity = await getRepository(tableName).findOne({ id: entityId }) as DBEntity;
  return entity;
}

async function getAllEntitiesByUserId(tableName: TableName, id: string): Promise<DBEntity[]> {
  const entities = await getRepository(tableName).find({ userId: id }) as unknown as DBEntity[];
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
