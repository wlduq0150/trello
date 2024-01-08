import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Columns } from "./column.entity";
import { Comment } from "./comment.entity";

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

    @Column({ default: "카드 색상" })
    color: string;

    @Column({ nullable: true })
    deadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.card)
    comments: Relation<Comment>[];

    @ManyToOne(() => Columns, (column) => column.cards, {
        nullable: false,
        onDelete: "CASCADE",
    })
    column: Relation<Columns>;

    @ManyToOne(() => User, (user) => user.cards, {
        nullable: true,
        onDelete: "CASCADE",
    })
    user: Relation<User>;
}
