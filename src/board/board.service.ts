import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { Board } from "src/entity/board.entity";
import { UpdateBoardDto } from "./dto/uptadeBoard.dto";
import { UserService } from "src/user/user.service";
import { LexoRank } from "lexorank";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly userService: UserService,
    ) {}
    async createBoard(createBoardDto: CreateBoardDto, userId: number) {
        const user = await this.userService.findUserById(userId);
        const board = await this.boardRepository.save({
            ...createBoardDto,
            users: [user],
        });

        return board;
    }

    async readBoard(id: number) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: { users: true, columns: true },
        });

        board.columns = board.columns.sort((a, b) => {
            return LexoRank.parse(a.lexo).compareTo(LexoRank.parse(b.lexo));
        });

        return board;
    }

    async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
        const board = await this.boardRepository.findOne({
            where: { id },
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
