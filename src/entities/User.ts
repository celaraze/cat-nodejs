import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Role} from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("varchar")
    username!: string;

    @Column("varchar")
    password!: string;

    @Column("varchar")
    email!: string;

    @Column("timestamp")
    createdAt!: Date;

    @Column("timestamp")
    updatedAt!: Date;

    @Column("timestamp")
    deletedAt!: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: "user_roles"
    })
    roles!: Relation<Role[]>;
}