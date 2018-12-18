import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HolidayEntity } from './holiday.entity';

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
    })
    name: string;
    holidays: Promise<HolidayEntity[]>;
    eager: true;
}
