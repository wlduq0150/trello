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
import { AlarmService } from "./alarm.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { UserId } from "src/auth/decorators/userId.decorator";

@Controller("alarm")
export class AlarmController {
    constructor(private readonly alarmService: AlarmService) {}

    //알림 조회
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get()
    readAlarm(@UserId() userId: number) {
        return this.alarmService.readAlarm(+userId);
    }

    //알림 삭제
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete(":alarmId")
    deleteAlarm(@Param("alarmId") id: string, @UserId() userId: number) {
        return this.alarmService.deleteAlarm(+id, userId);
    }
}
