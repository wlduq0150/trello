import { Module } from "@nestjs/common";
import { SseService } from "./sse.service";
import { SseController } from "./sse.controller";

@Module({
    exports: [SseService],
    controllers: [SseController],
    providers: [SseService],
})
export class SseModule {}
