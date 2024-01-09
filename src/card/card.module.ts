import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "src/entity/card.entity";
import { Columns } from "src/entity/column.entity";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";
import { SseModule } from "src/sse/sse.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Columns, Card]),
        UserModule,
        AuthModule,
        SseModule,
    ],
    exports: [CardService],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
