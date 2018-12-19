import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
    })
    name: string;
    users?: Promise<UserEntity[]>;
    eager: true;
}