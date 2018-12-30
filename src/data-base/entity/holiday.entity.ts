import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { LocationEntity } from './location.entity';

@Entity('holidays')
export class HolidayEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
    })
    title: string;

    @Column('datetime')
    startDate: Date;
    @Column('datetime')
    endDate: Date;
    @Column('double')
    price: number;
    @Column('text')
    description: string;
    @Column({
        nullable: true,
    })
    pictureUrl: string;

    @ManyToMany(type => UserEntity, user => user.holidays)
    @JoinTable()
    users: Promise<UserEntity[]>;
    @ManyToOne(type => LocationEntity, location => location.holidays, {
        eager: true,
    })
    location: LocationEntity;

}
