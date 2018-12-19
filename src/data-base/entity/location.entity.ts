import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { HolidayEntity } from './holiday.entity';

@Entity('locations')
export class LocationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
    })
    name: string;
    holidays?: Promise<HolidayEntity[]>;
    eager: true;
}