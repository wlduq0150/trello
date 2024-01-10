import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Alarm } from "src/entity/alarm.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class AlarmService {
    constructor(
        @InjectRepository(Alarm)
        private readonly alarmRepository: Repository<Alarm>,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {}

    //알림 저장
    async createAlarm(id: number, message: string) {
        const user = await this.userService.findUserById(id);
        await this.alarmRepository.save({
            message,
            user,
        });
    }

    //알림 조회
    async readAlarm(userId: number) {
        const user = await this.userService.findUserById(userId);

        const alarms = await this.alarmRepository
            .createQueryBuilder("alarm")
            .leftJoinAndSelect("alarm.user", "user")
            .where("alarm.userId = :userId", { userId })
            .select(["alarm.id", "alarm.message", "alarm.createdAt"])
            .getMany();

        if (!alarms) {
            throw new NotFoundException("알림이 존재하지 않습니다.");
        }
        return alarms;
    }

    async deleteAlarm(id: number) {
        await this.alarmRepository.delete({ id });
        return {
            message: "알람 삭제",
        };
    }
}
