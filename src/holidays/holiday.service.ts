import { Holiday } from './interface/holiday.interface';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class HolidaysService {
    private readonly holidays: Holiday[] = [];

    create(holiday: Holiday) {
        this.holidays.push(holiday);
    }

    findAll(): Holiday[] {
        return this.holidays;
    }
    findOne(id) {
      const result: any = this.holidays.find(holliday => holliday.id === id);
      if (result) {
        return result;
      }
      return HttpStatus.NOT_FOUND;
    }
    remove(id) {
        const foundHolidayIndex = this.holidays.find(holiday => holiday.id === id);
        const index = this.holidays.indexOf(foundHolidayIndex);
        this.holidays.splice(index, 1);
    }
}
