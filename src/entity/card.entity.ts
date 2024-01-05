import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: "cards", // 데이터베이스 테이블의 이름
})
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    content: string;

    @Column()
    color: string;

    @Column()
    deadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @ManyToOne(() => Column, (column) => column.cards, {
    //     nullable: false,
    //     onDelete: "CASCADE",
    // })
    // column: Relation<Column>;

    @ManyToOne(() => User, (user) => user.cards, {
        nullable: true,
        onDelete: "CASCADE",
    })
    user: Relation<User>;
}
