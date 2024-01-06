import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entity/card.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/entity/user.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Card)
        private cardRepository: Repository<Card>
    ) {}
// 댓글 기능 조회 (카드 id로 불러오기위해서 entitiy 수정 확인)
    async commentfind(cardid: number) {
        const card = await this.cardRepository.findOne({where: {id : cardid}})
        const comment = await this.commentRepository.find({
            where : {card: card}
        })

        return comment;
    }

    // 댓글 작성
    async comment(createCommentDto: CreateCommentDto, user: User, cardid: number) {
        const existCard = await this.cardRepository.findOne( { where:{id: cardid}})

        if(!existCard) {
            throw new BadRequestException('카드를 확인해주세요');
        }


        const comment = new Comment();
        comment.content = createCommentDto.comment;
        comment.card = existCard;
        comment.user = user;

        await this.commentRepository.save(comment);

        return comment.content;
    }


    // 댓글 수정(유저 확인)
    async commentUpdate(user: User, cardid: number, commentid: number, updateCommentDto: UpdateCommentDto) {
        const card = await this.cardRepository.findOne( { where:{id: cardid}})
        const comment = await this.commentRepository.findOne({where:{id: commentid, card: card}})

        if(comment.user !== user) {
            throw new BadRequestException('작성자를 확인해주세요.');
        }

        if(comment) {
            comment.content = updateCommentDto.comment;
            await this.commentRepository.save(comment);
            return comment;
        } else {
            throw new BadRequestException('댓글을 확인할 수 없습니다.');
        }
    }
    
    //댓글 삭제
    async commentDelete(user: User, cardid: number, commentid: number) {
        const card = await this.cardRepository.findOne({where:{id: cardid}});
        const comment = await this.commentRepository.findOne({where: {id: commentid, card: card}});

        if(comment.user !== user) {
            throw new BadRequestException('작성한 사용자만 삭제 가능합니다.');
        }

        if(comment) {
            await this.commentRepository.remove(comment);
        } else {
            throw new BadRequestException('해당 댓글을 찾을 수 없습니다.');
        }


    }
}
