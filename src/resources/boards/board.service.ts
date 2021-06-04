import * as boardRepo from './board.memory.repository';
import { Board, IBoard } from './board.model';

const getAll = (): Board[] => boardRepo.getAll();

const getById = (id: string): Board => boardRepo.getById(id);

const createBoard = (board: IBoard): Board => boardRepo.createBoard(new Board(board));

const updateBoard = ( id: string, entity: IBoard ): Board => boardRepo.updateBoard(id, entity);

const deleteBoard = (id: string): void => boardRepo.deleteBoard(id);

export { getAll, getById, createBoard, updateBoard, deleteBoard };
