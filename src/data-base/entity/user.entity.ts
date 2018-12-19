import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
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

    @ManyToMany(type => HolidayEntity, holiday => holiday.users, { cascade: ['insert'] })
    holidays?: Promise<HolidayEntity[]>;
    @ManyToOne(type => RoleEntity, role => role.users)
    role?: string;
}
