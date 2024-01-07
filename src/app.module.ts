import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigProjectModule } from "./config/config.module";
import { TypeormModule } from "./typeorm/typeorm.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
<<<<<<< HEAD
import { BoardModule } from './board/board.module';
=======
import { CommentModule } from './comment/comment.module';
>>>>>>> ed5f5188d1da2f7fcd7b7d552ca6795e53488baa

@Module({
    imports: [
        ConfigProjectModule,
        TypeormModule.forRoot(),
        AuthModule,
        UserModule,
<<<<<<< HEAD
        BoardModule,
=======
        CommentModule,
>>>>>>> ed5f5188d1da2f7fcd7b7d552ca6795e53488baa
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
