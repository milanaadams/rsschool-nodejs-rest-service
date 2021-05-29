import * as boardRepo from './board.memory.repository';
import { Board, IBoard } from './board.model';

/**
 * Get all boards
 * @returns {Board[]} array of Board instances
 */
const getAll = (): Board[] => boardRepo.getAll();

/**
 * Gets board by its id
 * @param {string} id board id
 * @returns {Board} Board instance
 */
const getById = (id: string): Board => boardRepo.getById(id);

/**
 * Create new board
 * @param {Board} board Board instance
 * @returns {Board} created Board instance
 */
const createBoard = (board: IBoard): Board => boardRepo.createBoard(new Board(board));

/**
 * Update board instance by board id
 * @param {string} id board id
 * @param {object} entity object with attributes to be updated
 * @returns {Board} updated Board instance
 */
const updateBoard = ( id: string, entity: IBoard ): Board => boardRepo.updateBoard(id, entity);

/**
 * Remove board by its id
 * @param {string} id board id
 * @returns {<void>}
 */
const deleteBoard = (id: string): void => boardRepo.deleteBoard(id);

export { getAll, getById, createBoard, updateBoard, deleteBoard };
