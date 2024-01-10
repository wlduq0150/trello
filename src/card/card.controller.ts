import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserId } from "src/auth/decorators/userId.decorator";
import { ChangeColumnCardDto } from "./dto/change-column-card.dto";
import { ChangeUserCardDto } from "./dto/change-user-card.dto";

@Controller("cards")
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get("test")
    sendDeadlinAlarm() {
        return this.cardService.sendDeadlinAlarm();
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post()
    create(@UserId() userId: number, @Body() createCardDto: CreateCardDto) {
        return this.cardService.create(+userId, createCardDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cardService.findCardById(+id);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
        return this.cardService.update(+id, updateCardDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.cardService.remove(+id);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch(":id/move")
    changeColumn(
        @Param("id") id: string,
        @Body() changeColumnCardDtoDto: ChangeColumnCardDto,
    ) {
        return this.cardService.changeColumn(+id, changeColumnCardDtoDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Patch(":id/changeUser")
    changeUser(
        @Param("id") id: string,
        @Body() changeUserCardDtoDto: ChangeUserCardDto,
    ) {
        return this.cardService.changeUser(+id, changeUserCardDtoDto);
    }
}
