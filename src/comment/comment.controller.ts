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

@Controller("comments")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // @UseGuards(accessTokenGuard)
    // @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("cards/:cardid/comments")
    async commentfind(@Param("cardid") cardid: number) {
        return await this.commentService.commentfind(cardid);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("cards/:cardid/comments")
    async comment(
        @Body() createComment: SwCreateDto,
        @Param("cardid") cardid: number,
        @UserId() userid: number,
    ) {
        return await this.commentService.comment(createComment, userid, cardid);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch("/:commentid")
    async commentUpdate(
        @Body() updateCommentDto: SwUpdateDto,
        @Param("commentid") commentid: number,
        @UserId() userid: number,
    ) {
        return await this.commentService.commentUpdate(
            userid,
            commentid,
            updateCommentDto,
        );
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete("/:commentid")
    async commentDelete(
        @Param("commentid") commentid: number,
        @UserId() userid: number,
    ) {
        return await this.commentService.commentDelete(userid, commentid);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("check")
    async checkComment(@UserId() userid: number) {
        return await this.commentService.checkComment(userid);
    }
}
