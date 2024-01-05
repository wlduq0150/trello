import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: "comments",
})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    author: Relation<User>;

    @CreateDateColumn()
    createdAt: Date;

    // @ManyToOne(() => Card, (card) => card.comments)
    // card: Relation<Card>;
}
