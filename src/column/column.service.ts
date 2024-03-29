import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { Columns } from "src/entity/column.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { LexoRank } from "lexorank";
import { ColumnMoveDto } from "./dto/move-column.dto";
import { getMaxLexoFromColumn } from "src/card/function/getMaxLexo.function";

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(Columns)
        private readonly columnRepository: Repository<Columns>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly configService: ConfigService,
    ) {}

    //칼럼 조회
    async readColumn(id: number) {
        const columns = await this.columnRepository
            .createQueryBuilder("column")
            .leftJoinAndSelect("column.cards", "cards")
            .where("column.id = :id", { id })
            .select([
                "column.title",
                "cards.name",
                "cards.id",
                "cards.lexo",
                "cards.color",
            ])
            .getOne();

        columns.cards = columns.cards.sort((a, b) => {
            return LexoRank.parse(a.lexo).compareTo(LexoRank.parse(b.lexo));
        });

        if (!columns) {
            throw new NotFoundException("칼럼이 존재하지 않습니다.");
        }
        return columns;
    }

    async findColumnById(id: number) {
        const column = await this.columnRepository.findOne({
            where: { id },
        });

        if (!column) {
            throw new NotFoundException("칼럼이 존재하지 않습니다.");
        }

        return column;
    }

    //칼럼 생성
    async createColumn(createColumnDto: CreateColumnDto) {
        const { boardId, title } = createColumnDto;
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
            relations: { columns: true },
        });

        let newLexo: LexoRank;

        if (board.columns.length === 0) {
            newLexo = LexoRank.middle();
        } else {
            newLexo = getMaxLexoFromColumn(board.columns).genNext();
        }

        const newColumn = await this.columnRepository.save({
            board: board,
            title,
            lexo: newLexo.toString(),
        });

        return newColumn;
    }

    //칼럼 수정
    async updateColumn(id: number, updateColumnDto: UpdateColumnDto) {
        const column = await this.findColumnById(id);
        const { title } = updateColumnDto;

        return await this.columnRepository.update({ id }, { title });
    }

    //칼럼 삭제
    async deleteColumn(id: number) {
        const column = await this.findColumnById(id);

        return await this.columnRepository.delete({ id });
    }

    async columnMove(columnId: number, { prevId, nextId }: ColumnMoveDto) {
        const column = await this.findColumnById(columnId);

        let prevColumn: Columns = null;
        let nextColumn: Columns = null;

        if (prevId) prevColumn = await this.findColumnById(prevId);
        if (nextId) nextColumn = await this.findColumnById(nextId);

        let newLexo: LexoRank;

        if (!prevColumn) {
            newLexo = LexoRank.parse(nextColumn.lexo).genPrev();
        } else if (!nextColumn) {
            newLexo = LexoRank.parse(prevColumn.lexo).genNext();
        } else {
            newLexo = LexoRank.parse(prevColumn.lexo).between(
                LexoRank.parse(nextColumn.lexo),
            );
        }

        column.lexo = newLexo.toString();
        await this.columnRepository.save(column);

        return true;
    }
}
