import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardService } from "./board.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { UpdateBoardDto } from "./dto/uptadeBoard.dto";
import { UserId } from "src/auth/decorators/userId.decorator";

@Controller("boards")
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @UserId() userId: number,
    ) {
        return this.boardService.createBoard(createBoardDto, userId);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("myboards")
    readMyBoards(@UserId() userId: number) {
        return this.boardService.readMyBoards(+userId);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("/:id")
    readBoard(@Param("id") id: number) {
        return this.boardService.readBoard(+id);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Put("/:id")
    updateBoard(
        @Param("id") id: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return this.boardService.updateBoard(id, updateBoardDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete("/:id")
    deleteBoard(@Param("id") id: number, @UserId() userId: number) {
        return this.boardService.deleteBoard(id, userId);
    }
}
