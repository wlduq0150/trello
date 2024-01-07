import { Module } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Columns } from "src/entity/column.entity";
import { Card } from "src/entity/card.entity";
import { Board } from "src/entity/board.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Columns, Card, Board])],
    providers: [ColumnService],
    controllers: [ColumnController],
})
export class ColumnModule {}
