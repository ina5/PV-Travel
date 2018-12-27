import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Location } from './location.entity';

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
    @ManyToMany(type => User, user => user.holidays, {
        cascade: ['insert'],
    })
    @JoinTable()
    users?: Promise<User[]>;
    @ManyToOne(type => Location, location => location.holidays)
    location?: Location;
    eager?: true;
}
