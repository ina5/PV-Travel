import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { HolidayEntity } from './holiday.entity';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({
        length: 100,
    })
    firstName: string;
    @Column({
        length: 100,
    })
    lastName: string;
    @Column({
        length: 100,
        nullable: true,
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

    @ManyToMany(type => HolidayEntity, holiday => holiday.users)
    holidays: Promise<HolidayEntity[]>;
    // holidays: Promise<HolidayEntity[]>;
    @ManyToOne(type => RoleEntity, role => role.users, {
        eager: true,
    })
    role: RoleEntity;

}
