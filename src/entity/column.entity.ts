import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Relation } from "typeorm";


// import { Board } from "./board.entity"
// import { Card } from "./card.entity"

@Entity({
    name: 'columns',
})
export class Columns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title:string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // @OneToMany(()=> Card, (card) => card.columns)
    // cards: Relation<Card>[];

    // @ManyToOne(() => Board, (board) => board.columns, {
    //     nullable: false,
    //     onDelete: "CASCADE",
    // })
    // board: Relation<Board>;

}
