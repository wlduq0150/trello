import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entity/comment.entity";
import { User } from "src/entity/user.entity";
import { Card } from "src/entity/card.entity";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment, User, Card]),
        UserModule,
        AuthModule,
    ],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
