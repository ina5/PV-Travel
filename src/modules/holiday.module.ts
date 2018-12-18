import { HolidayEntity } from './../data-base/entity/holiday.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidaysService } from './../services/holiday.service';
import { HolidaysController } from '../controllers/holiday.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([HolidayEntity])],
    controllers: [HolidaysController],
    providers: [HolidaysService],
})

export class HolidayModule { }
