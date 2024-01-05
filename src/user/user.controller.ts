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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { UserId } from "src/auth/decorators/userId.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("")
    findAll() {
        return this.userService.findAll();
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("me")
    findUserById(@UserId() id: string) {
        return this.userService.findUserById(+id);
    }
}
