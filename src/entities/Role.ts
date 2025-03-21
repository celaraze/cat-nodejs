import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {User} from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @Column()
    deletedAt!: Date;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable()
    users!: Relation<User[]>;
}