import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entity/card.entity";
import { Comment } from "src/entity/comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "src/entity/user.entity";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userSerivce: UserService,
    ) {}

    // 댓글 기능 조회
    async commentfind(cardid: number) {
        const card = await this.cardRepository.findOne({
            where: { id: cardid },
            select: ["id"],
        });
        const comment = await this.commentRepository.find({
            where: { card: card },
        });

        if (!card) {
            throw new BadRequestException("카드 상태를 확인해주세요");
        }

        // if (!comment) {
        //     throw new BadRequestException("댓글이 존재하지 않습니다.");
        // }

        console.log(comment);

        return comment;
    }

    // 댓글 작성
    async comment(
        createCommentDto: CreateCommentDto,
        userid: number,
        cardid: number,
    ) {
        const existCard = await this.cardRepository.findOne({
            where: { id: cardid },
        });

        const user = await this.userSerivce.findUserById(userid);

        // console.log(createCommentDto.comment, existCard, user);

        if (!existCard) {
            throw new BadRequestException("카드를 확인해주세요");
        }

        const comment = new Comment();
        comment.content = createCommentDto.comment;
        comment.card = existCard;
        comment.user = user;

        await this.commentRepository.save(comment);

        return comment.content;
    }

    // 댓글 수정(유저 확인)
    async commentUpdate(
        userid: number,
        commentid: number,
        updateCommentDto: UpdateCommentDto,
    ) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentid },
            relations: { user: true },
        });

        console.log(comment.user.id);
        console.log("-------------");

        const user = await this.userSerivce.findUserById(userid);
        console.log(user.id);

        if (comment.user.id !== user.id) {
            throw new BadRequestException("작성자를 확인해주세요.");
        }

        if (comment) {
            comment.content = updateCommentDto.comment;
            await this.commentRepository.save(comment);
            return comment;
        } else {
            throw new BadRequestException("댓글을 확인할 수 없습니다.");
        }
    }

    //댓글 삭제

    async commentDelete(userid: number, commentid: number) {

        const comment = await this.commentRepository.findOne({
            where: { id: commentid },
            relations: { user: true },
        });

        const user = await this.userSerivce.findUserById(userid);

        if (comment.user.id !== user.id) {
            throw new BadRequestException("작성한 사용자만 삭제 가능합니다.");
        }

        if (comment) {
            await this.commentRepository.remove(comment);
        } else {
            throw new BadRequestException("해당 댓글을 찾을 수 없습니다.");
        }
    }

    async checkComment(userid: number) {
        const test = await this.userSerivce.findUserById(userid);
        console.log(test);
    }

    // async findUser(userid: number) {
    //     return await this.userRepository.findOne({
    //         where: { id: userid },
    //         select: [
    //             "id",
    //             "email",
    //             "password",
    //             "currentRefreshToken",
    //             "name",
    //             "createdAt",
    //             "updatedAt",
    //         ],
    //     });
    // }
}
