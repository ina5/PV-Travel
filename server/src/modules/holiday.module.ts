import { LocationEntity } from './../data-base/entity/location.entity';
import { HolidayEntity, UserEntity } from 'src/data-base/entity';
import { Module } from '@nestjs/common';
import { HolidaysController } from 'src/controllers/holiday.controller';
import { HolidaysService } from 'src/services/holiday.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([HolidayEntity]), TypeOrmModule.forFeature([LocationEntity]), TypeOrmModule.forFeature([UserEntity])],
    controllers: [HolidaysController],
    providers: [HolidaysService],
})

export class HolidayModule { }
