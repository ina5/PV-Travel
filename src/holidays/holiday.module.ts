import { HolidaysService } from './holiday.service';
import { HolidaysController } from './holiday.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [HolidaysController],
    providers: [HolidaysService],
})

export class HolidayModule { }
