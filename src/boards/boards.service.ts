import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStorage } from './boards.storage';
import { TaskStorage } from '../tasks/tasks.storage';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardStorage: BoardStorage,
    private readonly taskStorage: TaskStorage,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardStorage.createBoard(createBoardDto);
  }

  findAll() {
    return this.boardStorage.findAllBoards();
  }

  findOne(id: string) {
    return this.boardStorage.findOneBoard(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardStorage.updateBoard(id, updateBoardDto);
  }

  async remove(id: string) {
    const board = await this.boardStorage.deleteBoard(id);
    if (board) {
      const tasks = await this.taskStorage.findAAllTasksByBoard(id);
      if (tasks) {
        tasks.forEach(async (task) => {
          await this.taskStorage.deleteTask(task.id);
        });
      }
    }
  }
}
