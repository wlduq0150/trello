import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Board } from "./board.entity";
import { Card } from "./card.entity";
import { InvitedUsers } from "./invited-users.entity";
import { Alarm } from "./alarm.entity";

@Entity({
    name: "users", // 데이터베이스 테이블의 이름
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    currentRefreshToken?: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Relation<Comment>[];

    @ManyToMany(() => Board, (board) => board.users,{cascade:true})
    boards: Relation<Board>[];

    @OneToMany(() => Card, (card) => card.user)
    cards: Relation<Card>[];

    @OneToMany(() => InvitedUsers, (inviteduser) => inviteduser.user)
    Invitedusers:Relation<InvitedUsers>
  
    @OneToMany(() => Alarm, (alarm) => alarm.user)
    alarms: Relation<Alarm>[];
}
