import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
        nullable: false,
    })
    name: string;
    // users: Promise<UserEntity[]>;
    @OneToMany(type => UserEntity, user => user.role)
    users: Promise<UserEntity[]>;
}