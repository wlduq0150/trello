import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Repository } from "typeorm";
import { Card } from "src/entity/card.entity";
import { UserService } from "src/user/user.service";
import { Columns } from "src/entity/column.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ChangeColumnCardDto } from "./dto/change-column-card.dto";
import { ChangeUserCardDto } from "./dto/change-user-card.dto";
import { CardMoveDto } from "./dto/move-card.dto";
import { LexoRank } from "lexorank";
import { ColumnService } from "src/column/column.service";
import { getMaxLexoFromColumn } from "./function/getMaxLexo.function";
import { SseService } from "src/sse/sse.service";
import { Cron } from "@nestjs/schedule";
import { AlarmService } from "src/alarm/alarm.service";

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        @InjectRepository(Columns)
        private readonly columnRepository: Repository<Columns>,
        private readonly userSerivce: UserService,
        private readonly sseService: SseService,
        private readonly alarmService: AlarmService,
    ) {}

    async create(userId: number, createCardDto: CreateCardDto) {
        const { columnId, name, content, color, deadline } = createCardDto;

        const user = await this.userSerivce.findUserById(userId);
        if (!user) {
            throw new NotFoundException("존재하지 않는 사용자입니다.");
        }

        const column = await this.columnRepository.findOne({
            where: { id: columnId },
            relations: { cards: true },
        });
        if (!column) {
            throw new NotFoundException("존재하지 않는 컬럼입니다.");
        }

        let newLexo: LexoRank;

        if (column.cards.length === 0) {
            newLexo = LexoRank.middle();
        } else {
            newLexo = getMaxLexoFromColumn(column.cards).genNext();
        }

        return await this.cardRepository.save({
            user,
            column,
            name,
            content,
            color,
            deadline,
            lexo: newLexo.toString(),
        });
    }

    async findCardById(id: number) {
        const card = await this.cardRepository.findOne({
            where: { id },
            relations: {
                user: true,
                column: true,
                comments: true,
            },
        });

        if (!card) {
            throw new NotFoundException("존재하지 않는 카드입니다.");
        }

        return card;
    }

    async update(id: number, updateCardDto: UpdateCardDto) {
        await this.findCardById(id);

        await this.cardRepository.update(
            {
                id,
            },
            {
                ...updateCardDto,
            },
        );

        return { message: "성공적으로 카드를 수정하였습니다." };
    }

    async remove(id: number) {
        await this.findCardById(id);

        await this.cardRepository.delete({ id });

        return { message: "성공적으로 카드를 삭제하였습니다." };
    }

    async changeColumn(id: number, { columnId }: ChangeColumnCardDto) {
        await this.findCardById(id);

        const column = await this.columnRepository.findOneBy({ id: columnId });
        if (!column) {
            throw new NotFoundException("존재하지 않는 컬럼입니다.");
        }

        await this.cardRepository.update(
            {
                id,
            },
            {
                column,
            },
        );

        return {
            message: `${id}번 카드를 ${columnId}번 컬럼으로 이동했습니다.`,
        };
    }

    async changeUser(id: number, { userId }: ChangeUserCardDto) {
        await this.findCardById(id);

        const user = await this.userSerivce.findUserById(userId);
        if (!user) {
            throw new NotFoundException("존재하지 않는 사용자입니다.");
        }

        await this.cardRepository.update(
            {
                id,
            },
            {
                user,
            },
        );

        this.sseService.emitCardChangeEvent(user.id, "카드가 수정되었습니다.");
        this.alarmService.createAlarm(user.id, "카드가 수정되었습니다.");

        return {
            message: `${id}번 카드의 담당자를 ${userId}번 사용자로 변경했습니다.`,
        };
    }

    async cardMove(cardId: number, { columnId, prevId, nextId }: CardMoveDto) {
        const card = await this.findCardById(cardId);

        if (columnId) {
            const column = await this.columnRepository.findOneBy({
                id: columnId,
            });
            if (!column) {
                throw new NotFoundException("존재하지 않는 컬럼입니다.");
            }

            card.column = column;
        }

        let prevCard: Card = null;
        let nextCard: Card = null;

        if (prevId) prevCard = await this.findCardById(prevId);
        if (nextId) nextCard = await this.findCardById(nextId);

        let newLexo: LexoRank;

        if (!prevCard && !nextCard) {
            newLexo = LexoRank.middle();
        } else if (!prevCard) {
            newLexo = LexoRank.parse(nextCard.lexo).genPrev();
        } else if (!nextCard) {
            newLexo = LexoRank.parse(prevCard.lexo).genNext();
        } else {
            newLexo = LexoRank.parse(prevCard.lexo).between(
                LexoRank.parse(nextCard.lexo),
            );
        }

        card.lexo = newLexo.toString();
        await this.cardRepository.save(card);

        return true;
    }

    @Cron(" 15 10 * * *")
    async sendDeadlinAlarm() {
        const today = new Date().getDate();
        const cards = await this.cardRepository.find({
            relations: {
                user: true,
            },
            select: ["id", "deadline", "user"],
        });
        const deadlineAlarm = cards
            .filter((card) => card.deadline.getDate() == today + 1)
            .map((card) => {
                return { cardId: card.id, userId: card.user.id };
            })
            .map((card) => {
                this.sseService.emitCardChangeEvent(
                    card.userId,
                    `${card.cardId}의 마감 기한이 하루 남았습니다.`,
                );
                this.alarmService.createAlarm(
                    card.userId,
                    `${card.cardId}의 마감 기한이 하루 남았습니다.`,
                );
            });
    }
}
