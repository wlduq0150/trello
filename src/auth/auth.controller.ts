import {
    Body,
    Controller,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { SignupUserDto } from "./dto/signup-user.dto";
import { accessTokenGuard } from "./guard/access-token.guard";
import { refreshTokenGuard } from "./guard/refresh-token.guard";
import { Request } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body() singupUserDto: SignupUserDto) {
        return this.authService.signup(singupUserDto);
    }

    @Post("login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @ApiBearerAuth("refreshToken")
    @UseGuards(refreshTokenGuard)
    @Post("refresh")
    refresh(@Req() req: Request) {
        const userId: number = (req.user as any).userId;

        if (!userId) {
            throw new UnauthorizedException("로그인 오류입니다.");
        }

        return this.authService.refresh(userId);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("logout")
    logout(@Req() req: Request) {
        const userId: number = (req.user as any).userId;

        if (!userId) {
            throw new UnauthorizedException("로그인 오류입니다.");
        }

        return this.authService.logout(userId);
    }
}
