import { Body, Controller, Delete, Patch } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { UseGuards } from "@nestjs/common";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { Get } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "src/entity/user.entity";
import { UserId } from "src/auth/decorators/userId.decorator";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SwCreateDto } from "./dto/swcreate-comment.dto";
import { SwUpdateDto } from "./dto/swupdate-comment.dto";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // @UseGuards(accessTokenGuard)
    // @ApiBearerAuth("accessToken")
    @Get("cards/:cardid/comments")
    async commentfind(@Param('cardid') cardid: number) {
        return await this.commentService.commentfind(cardid);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("cards/:cardid/comments")
    async comment(@Body() createComment: SwCreateDto, @Param('cardid') cardid: number, @UserId() user: User) {
        return await this.commentService.comment(createComment, user, cardid)
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch("cards/:cardid/comments/:commentid")
    async commentUpdate(@Body() updateCommentDto: SwUpdateDto, @Param('cardid') cardid: number, @Param('commentid') commentid: number, @UserId() user:User) {
        return await this.commentService.commentUpdate(user, cardid, commentid, updateCommentDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete('cards/:cardid/comments/:commentid')
    async commentDelete(@Param('cardid') cardid: number, @Param('commentid') commentid: number, @UserId() user:User) {
        return await this.commentService.commentDelete(user, cardid, commentid);
    }
}
