import { CreateHolidayDTO } from './../holidays/dto/create-holiday.dto';
import { Holiday } from '../holidays/interface/holiday.interface';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidayEntity } from 'src/data-base/entity';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(HolidayEntity)
    private readonly holidayRepository: Repository<HolidayEntity>,
  ) {}
  private readonly holidays: Holiday[] = [];

    async create(dto: CreateHolidayDTO): Promise<HolidayEntity> {

      const { title, startDate, endDate, price, description, location} = dto;
      // const qb = await getRepository(HolidayEntity)
      // .createQueryBuilder('holidays')
      // .where('holidays.title = :title', { title });

      // const holiday = await qb.getOne();

      const holiday = await this.holidayRepository.findOne({where: {title}});

      if (holiday) {
        console.log(holiday);
        const otheEerrors = {title: 'Title must be unique'};
        throw new HttpException({message: 'Input data validation failed', otheEerrors}, HttpStatus.BAD_REQUEST);
      }

      const newHoliday = new HolidayEntity();
      newHoliday.title = title;
      newHoliday.startDate = new Date(startDate);
      newHoliday.endDate = new Date(endDate);
      newHoliday.price = price;
      newHoliday.description = description;

      const errors = await validate(newHoliday);
      if (errors.length > 0) {
        const _errors = {title: 'Userinput is not valid.'};
        throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
      } else {
        const savedHoliday = await this.holidayRepository.save(newHoliday);
        return {
          id: savedHoliday.id,
          title: savedHoliday.title,
          startDate : savedHoliday.startDate,
          endDate : savedHoliday.endDate,
          price : savedHoliday.price,
          description : savedHoliday.description,
        };
      }
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
