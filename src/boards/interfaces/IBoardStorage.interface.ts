import { CreateBoardDto } from './../dto/create-board.dto';
import { Board } from '../entities/board.entity';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface IBoardStorage {
  findAllBoards: () => Promise<Board[]>;
  findOneBoard: (id: string) => Promise<Board>;
  createBoard: (boardDto: CreateBoardDto) => Promise<Board>;
  updateBoard: (id: string, updateBoardDto: UpdateBoardDto) => Promise<Board>;
  deleteBoard: (id: string) => Promise<Board>;
}
