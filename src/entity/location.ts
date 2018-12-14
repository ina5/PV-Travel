
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Holiday } from './holiday';


@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100
    })
    name: string;
    holidays: Promise<Holiday[]>;
    eager: true;
}