import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";

@Entity({
    name: "invitedusers",
})
export class InvitedUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isaccepted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Board, (board) => board.Invitedusers)
    board: Relation<Board>;

    @ManyToOne(() => User, (user) => user.Invitedusers)
    user: Relation<User>;
}