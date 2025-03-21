import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Role} from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @Column()
    deletedAt!: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles!: Relation<Role[]>;
}