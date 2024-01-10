import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Put,
} from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { UserId } from "src/auth/decorators/userId.decorator";
import { ColumnMoveDto } from "./dto/move-column.dto";

// :boardId/columns
@Controller("columns")
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    //컬럼 카드 조회
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get(":columnsId")
    readColumn(@Param("columnsId") id: string) {
        return this.columnService.readColumn(+id);
    }

    //컬럼 생성
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("")
    createColumn(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.createColumn(createColumnDto);
    }

    //컬럼 수정
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Put(":columnsId")
    updateColumn(
        @Param("columnsId") id: string,
        @Body() updateColumnDto: UpdateColumnDto,
    ) {
        return this.columnService.updateColumn(+id, updateColumnDto);
    }

    //컬럼 삭제
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete(":columnsId")
    deleteColumn(@Param("columnsId") id: string) {
        return this.columnService.deleteColumn(+id);
    }

    //컬럼 이동
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch(":id/move")
    columnMove(
        @Param("id") columnId: number,
        @Body() columnMoveDto: ColumnMoveDto,
    ) {
        return this.columnService.columnMove(columnId, columnMoveDto);
    }
}
