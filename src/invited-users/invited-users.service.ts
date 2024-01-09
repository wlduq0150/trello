import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
import { InvitedUsers } from "src/entity/invited-users.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
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

        //invitedUser 테이블에 유저, 보드id 추가
        const invitedUser = this.invitedUserRepository.create({
            user,
            board,
        });
        await this.invitedUserRepository.save(invitedUser);

        const token = this.generateAccessToken(user.id, board.id);

        const baseUrl = "http://localhost:5000"; // TODO: config

        const url = `${baseUrl}/invited-users?token=${token}`;

        await this.mailerService
            .sendMail({
                to: user.email,
                from: this.configService.get<string>("MAIL_USER"),
                subject: "트렐로 초대합니다",
                template: "invitation",
                context: {
                    invitationLink: `
        초대수락 버튼를 누르시면 초대 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>초대수락</button>
        </form>
      `,
                },
            })
            .then(() => {})
            .catch(() => {});

        return { message: "초대가 성공적으로 수락되었습니다." };
    }

    async verifyEmail(token: string) {
        //userboard 테이블에 userid,boardid 추가
        const payload = await this.jwtService.verify(token, {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
        });
        const user = await this.userRepository.findOne({
            where: { id: payload.userId },
        });
        const board = await this.boardRepository.findOne({
            where: { id: payload.boardId },
        });
        user.boards = [...user.boards, board];
        this.userRepository.save(user);

        // invitedUser 테이블 isaccepted true로 변경
        // invitedUsers.isaccepted = true;

        const invitedUser = await this.invitedUserRepository.find({
            where: {user,board},
        });
        await this.invitedUserRepository.remove(invitedUser);

        // const invitedUser = this.invitedUserRepository.create({
        //     user,
        //     board,
        // });
        // await this.invitedUserRepository.save(invitedUser);


    }
}

// if (!user || !board) {
//     throw new BadRequestException("유저 또는 보드를 찾을 수 없습니다.");
// }

// //invitedUser 테이블에 유저, 보드id 추가
// const invitedUser = this.invitedUserRepository.create({
//     user,
//     board,
// });
// await this.invitedUserRepository.save(invitedUser);