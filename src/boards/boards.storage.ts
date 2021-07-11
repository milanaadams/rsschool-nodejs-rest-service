import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { IBoardStorage } from './interfaces/IBoardStorage.interface';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardStorage implements IBoardStorage {
  async findAllBoards(): Promise<Board[]> {
    return getRepository(Board).find();
  }

  async findOneBoard(id: string): Promise<Board> {
    const board = await getRepository(Board).findOne({ id });
    if (!board) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return board;
  }

  async createBoard(board: CreateBoardDto): Promise<Board> {
    const newBoard = await getRepository(Board).save(board);
    // COLUMNS.createColumn(board.columns);
    const getNewBoard = await this.findOneBoard(newBoard.id);
    return getNewBoard;
  }

  async updateBoard(id: string, newBoardInfo: UpdateBoardDto): Promise<Board> {
    const boardToUpdate = await this.findOneBoard(id);
    if (boardToUpdate) {
      Object.assign(boardToUpdate, newBoardInfo);
      await getRepository(Board).save(boardToUpdate);
    }
    const updatedBoard = await this.findOneBoard(id);
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<Board> {
    const board = await this.findOneBoard(id);
    if (board) {
      await getRepository(Board).remove(board);
    }
    return board;
  }
}
