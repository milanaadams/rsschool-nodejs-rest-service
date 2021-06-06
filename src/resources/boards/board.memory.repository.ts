import * as DB from '../../utils/dbUtils';
import * as TASK from '../tasks/task.memory.repository';
import { NotFoundError } from '../../errors/notFound';
import { Board, IBoard } from './board.model';

const TABLE_NAME = 'Boards';

/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = (): Board[] => DB.getAllEntities(TABLE_NAME) as Board[];

/**
 * Gets board by its id
 * @param {string} id  board id
 * @returns {Board} Board instance
 */
const getById = (id: string): Board => {
  const board = DB.getEntity(TABLE_NAME, id) as Board;
  if (!board) throw new NotFoundError(`Board with id ${id} not found`, 404);
  return board;
}

/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = (board: IBoard): Board => DB.createEntity(TABLE_NAME, board) as Board;

/**
 * Update board instance by board id
 * @param {string} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = (id: string, entity: IBoard): Board => DB.updateEntity(TABLE_NAME, id, entity) as Board;

/**
 * Remove board by its id
 * @param {string} id board id
 */
const deleteBoard = (id: string): void => {
  const board = getById(id);
  if(board) {
    DB.deleteEntity(TABLE_NAME, id);
    const tasks = TASK.getAll(id);
    if(tasks) {
      tasks.forEach((task) => TASK.deleteTask(task.id));
    }
  }
}

export { getAll, getById, createBoard, updateBoard, deleteBoard };
