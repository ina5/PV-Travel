import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HolidayEntity } from './holiday.entity';

@Entity('locations')
export class LocationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
        nullable: false,
    })
    name: string;
    // holidays: Promise<HolidayEntity[]>;
    @OneToMany(type => HolidayEntity, holiday => holiday.location)
    holidays: Promise<HolidayEntity[]>;
}
