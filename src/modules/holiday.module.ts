import { LocationEntity } from './../data-base/entity/location.entity';
import { HolidayEntity } from 'src/data-base/entity';
import { Module } from '@nestjs/common';
import { HolidaysController } from 'src/controllers/holiday.controller';
import { HolidaysService } from 'src/services/holiday.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([HolidayEntity]), TypeOrmModule.forFeature([LocationEntity])],
    controllers: [HolidaysController],
    providers: [HolidaysService],
})

export class HolidayModule { }
