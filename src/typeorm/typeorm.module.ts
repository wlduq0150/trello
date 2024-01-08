import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entity/comment.entity";
import { Board } from "src/entity/board.entity";
import { Card } from "src/entity/card.entity";
import { User } from "src/entity/user.entity";
import { Columns } from "src/entity/column.entity";

@Module({})
export class TypeormModule {
    static forRoot(): DynamicModule {
        const typeormModule: DynamicModule = TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>("DATABASE_HOST"),
                port: configService.get<number>("DATABASE_PORT"),
                username: configService.get<string>("DATABASE_USERNAME"),
                password: configService.get<string>("DATABASE_PASSWORD"),
                database: configService.get<string>("DATABASE_NAME"),
                entities: [User, Board, Card, Columns, Comment],
                synchronize: true,
            }),
            inject: [ConfigService],
        });

        return {
            module: TypeOrmModule,
            imports: [typeormModule],
            exports: [typeormModule],
        };
    }
}