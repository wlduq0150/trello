import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { Board } from "src/entity/board.entity";
import { UpdateBoardDto } from "./dto/uptadeBoard.dto";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}
    async createBoard(createBoardDto: CreateBoardDto) {
        const board = await this.boardRepository.save(createBoardDto);

        return board;
    }

    async getBoard(id: number) {
        return await this.boardRepository.findOne({ where: { id } });
    }

    async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ["columns"],
        });

        if (!board) {
            throw new NotFoundException("보드가 존재하지 않습니다.");
        }
        board.title = updateBoardDto.title;
        board.background = updateBoardDto.background;
        board.description = updateBoardDto.description;

        await this.boardRepository.save(board);

        return board;
    }

    async deleteBoard(id: number) {
        const board = await this.boardRepository.findOne({ where: { id } });
        console.log("board", board);
        if (!board) {
            throw new NotFoundException("보드가 존재하지 않습니다.");
        }
        await this.boardRepository.delete({ id });
        return {
            message: "보드가 성공적으로 삭제되었습니다.",
        };
    }
}
