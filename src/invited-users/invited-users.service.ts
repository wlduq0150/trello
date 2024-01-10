import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
import { InvitedUsers } from "src/entity/invited-users.entity";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class InvitedUsersService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectRepository(InvitedUsers)
        private readonly invitedUserRepository: Repository<InvitedUsers>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    generateAccessToken(id: number, boardId: number) {
        const payload = { userId: id, boardId: boardId };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXP"),
        });

        return {
            accessToken,
        };
    }

    async InviteUser(userId: number, boardId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
        });

        if (!user || !board) {
            throw new BadRequestException("유저 또는 보드를 찾을 수 없습니다.");
        }

        console.log("user", user);
        console.log("board", board);

        const existingInvitedUser  = await this.invitedUserRepository.findOne({
            where: { userId: user.id, boardId: board.id },
        });

        if(existingInvitedUser) {
            throw new BadRequestException ("해당 유저는 이미 초대되었습니다.")
        }

        //invitedUser 테이블에 유저, 보드id 추가
        const invitedUser = this.invitedUserRepository.create({
            user,
            board,
        });
        await this.invitedUserRepository.save(invitedUser);

        const token = this.generateAccessToken(user.id, board.id);

        const baseUrl = "http://localhost:5000";

        const url = `${baseUrl}/invited-users?token=${token.accessToken}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: this.configService.get<string>("MAIL_USER"),
            subject: "트렐로 초대합니다",
            html: `
        초대수락 버튼를 누르시면 초대 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>초대수락</button>
        </form>
      `,
        });
        return { message: "초대가 성공적으로 발송되었습니다." };
    }

    async verifyEmail(token: string) {
        //userboard 테이블에 userid,boardid 추가
        const payload = await this.jwtService.verify(token, {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
        });
        const user = await this.userRepository.findOne({
            where: { id: payload.userId },
            relations: { boards: true },
        });
        const board = await this.boardRepository.findOne({
            where: { id: payload.boardId },
        });

        if (!user || !board) {
            throw new BadRequestException("유저 또는 보드를 찾을 수 없습니다.");
        }

        const invitedUser = await this.invitedUserRepository.find({
            where: { userId: user.id, boardId: board.id },
        });
        console.log("invitedUser", invitedUser);

        user.boards = [...user.boards, board];
        await this.userRepository.save(user);

        await this.invitedUserRepository.remove(invitedUser);
    }
}
