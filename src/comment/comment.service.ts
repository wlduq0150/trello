import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entity/card.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/entity/user.entity';

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
        const comment = await this.commentRepository.find({
            // where : {cardid},
            
        })
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


    // 댓글 수정
    async commentUpdate(cardid: number, commentid: number) {
        
    }
    
}
