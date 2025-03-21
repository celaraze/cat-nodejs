import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {User} from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("varchar", {array: true})
    scopes!: string[];

    @Column("timestamp")
    createdAt!: Date;

    @Column("timestamp")
    updatedAt!: Date;

    @Column("timestamp")
    deletedAt!: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users!: Relation<User[]>;
}