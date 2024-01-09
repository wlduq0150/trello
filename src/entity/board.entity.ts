import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Columns } from "./column.entity";
import { InvitedUsers } from "./invited-users.entity";

@Entity({
    name: "boards",
})
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    background: string;

    @Column()
    description: string;

    @Column()
    creator: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.boards)
    @JoinTable()
    users: Relation<User>[];

    @OneToMany(() => InvitedUsers, (inviteduser) => inviteduser.board)
    Invitedusers:Relation<InvitedUsers>

    @OneToMany(() => Columns, (column) => column.board)
    columns: Relation<Columns>[];
}
