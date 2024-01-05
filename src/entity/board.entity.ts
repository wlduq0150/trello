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
import { User } from "./user.entity";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @ManyToMany(() => User, user => user.boards)
    // users: Relation<User>[];

    // @OneToMany(() => Column, column => column.board)
    // columns: Relation<Column>[]
}
