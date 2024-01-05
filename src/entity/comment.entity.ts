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
import { Card } from "./card.entity";

@Entity({
    name: "comments",
})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.comments, {
        eager: true,
        nullable: false,
    })
    user: Relation<User>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Card, (card) => card.comments, {
        eager: true,
        nullable: false,
    })
    card: Relation<Card>;
}
