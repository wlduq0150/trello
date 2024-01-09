import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigProjectModule } from "./config/config.module";
import { TypeormModule } from "./typeorm/typeorm.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { InvitedUsersModule } from './invited-users/invited-users.module';

@Module({
    imports: [
        ConfigProjectModule,
        TypeormModule.forRoot(),
        AuthModule,
        UserModule,
        BoardModule,
        CommentModule,
        InvitedUsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
