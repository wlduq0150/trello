import { Module } from "@nestjs/common";
import { AlarmController } from "./alarm.controller";
import { AlarmService } from "./alarm.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Alarm } from "src/entity/alarm.entity";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Alarm]), UserModule],
    exports: [AlarmService],
    controllers: [AlarmController],
    providers: [AlarmService],
})
export class AlarmModule {}
