import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entity/comment.entity";
import { User } from "src/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
