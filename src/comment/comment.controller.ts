import { Controller } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { UseGuards } from "@nestjs/common";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { Get } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "src/entity/user.entity";
import { UserId } from "src/auth/decorators/userId.decorator";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(accessTokenGuard)
    @Get("cards/:cardid/comments")
    async commentfind(@Param('cardid') cardid: number) {
        return await this.commentService.commentfind(cardid);
    }


    @UseGuards(accessTokenGuard)
    @Post("cards/:cardid/comments")
    async comment(createComment: CreateCommentDto, @Param('cardid') cardid: number, @UserId user: User) {
        return await this.commentService.comment(createComment, user, cardid)
    }
}
