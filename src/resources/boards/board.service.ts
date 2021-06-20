import * as boardRepo from './board.memory.repository';
import { Board, IBoard } from './board.model';

const getAll = async (): Promise<Board[]> => boardRepo.getAll();

const getById = async (id: string): Promise<Board> => boardRepo.getById(id);

const createBoard = async (board: IBoard): Promise<Board> => boardRepo.createBoard(new Board(board));

const updateBoard = async ( id: string, entity: IBoard ): Promise<Board> => boardRepo.updateBoard(id, entity);

const deleteBoard = async (id: string): Promise<void> => boardRepo.deleteBoard(id);

export { getAll, getById, createBoard, updateBoard, deleteBoard };
