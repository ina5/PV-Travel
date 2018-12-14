import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Holiday } from './holiday';
import { Role } from './role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({
        length: 100
    })
    firstName: string;
    @Column({
        length: 100,
        nullable: true
    })
    lastName: string;
    @Column({
        length: 100
    })
    username: string;
    @Column({
        length: 100,

    })
    password: string;
    @Column({
        length: 100,

    })
    email: string;


    @ManyToMany(type => Holiday, holiday => holiday.users, { cascade: ['insert'] })
    holidays: Promise<Holiday[]>;
    @ManyToOne(type => Role, role => role.users)
    role: Role;
    eager: true;
}