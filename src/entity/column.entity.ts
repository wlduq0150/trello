import { Column, Entity, JoinColumnOptions, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";


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

    // @OneToMany(()=> CreateDateColumn, (card) => card.columns)
    // cards: Card[]

    // @ManyToOne(() => Board, (board) => board.columns)
    // @JoinColumn({ name: 'board_id'})
    // board: Board;

    // @Column({name: 'board_id'})
    // board_id: number
}
