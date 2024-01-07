import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Relation,
} from "typeorm";
import { Card } from "./card.entity";
import { Board } from "./board.entity";

@Entity({
    name: "columns",
})
export class Columns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;


    @OneToMany(() => Card, (card) => card.column)
    cards: Relation<Card>[];


    @ManyToOne(() => Board, (board) => board.columns, {
        nullable: false,
        onDelete: "CASCADE",
    })
    board: Relation<Board>;

}
