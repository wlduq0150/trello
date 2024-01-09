import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { Board } from "src/entity/board.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Columns } from "src/entity/column.entity";
import { UserModule } from "src/user/user.module";
import { User } from "src/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Board,Columns,User]),UserModule],
    providers: [BoardService],
    controllers: [BoardController],
})
export class BoardModule {}
