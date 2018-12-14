import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user';


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100
    })
    name: string;
    users: Promise<User[]>;
    eager: true;
}