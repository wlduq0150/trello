import { Module } from "@nestjs/common";
import { InvitedUsersController } from "./invited-users.controller";
import { InvitedUsersService } from "./invited-users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { InvitedUsers } from "src/entity/invited-users.entity";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        AuthModule,
        JwtModule,
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: "smtp.gmail.com",
                    port: 587,
                    auth: {
                        user: configService.get<string>("MAIL_USER"),
                        pass: configService.get<string>("MAIL_PASS"),
                    },
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                template: {
                    dir: __dirname + "/templates",
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Board, User, InvitedUsers]),
    ],
    controllers: [InvitedUsersController],
    providers: [InvitedUsersService],
})
export class InvitedUsersModule {}
