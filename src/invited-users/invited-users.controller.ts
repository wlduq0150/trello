import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { InvitedUsersService } from "./invited-users.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";

@Controller("invited-users")
export class InvitedUsersController {
    constructor(private readonly invitedUsersService: InvitedUsersService) {}

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("/:userId/:boardId")
    async InviteUser(
        @Param("userId") userId: number,
        @Param("boardId") boardId: number,
    ) {
        return this.invitedUsersService.InviteUser(userId, boardId);
    }

    @Post()
    async verifyEmail(
        @Query("token") token: string
    ) {
        return this.invitedUsersService.verifyEmail(token);
    }
}
