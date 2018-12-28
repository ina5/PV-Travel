import { CreateLocationDTO } from './../dto/create-location.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidayEntity, LocationEntity } from 'src/data-base/entity';
import { Repository } from 'typeorm';
import { CreateHolidayDTO } from 'src/dto/create-holiday.dto';

@Injectable()
export class HolidaysService {
    constructor(@InjectRepository(HolidayEntity)
    private readonly holidayRepository: Repository<HolidayEntity>,
        // tslint:disable-next-line:align
        @InjectRepository(LocationEntity) private readonly locationRepository: Repository<LocationEntity>) { }

    async create(holiday: CreateHolidayDTO) {

        // Check if holiday is already exist (by Title)
        const holidayFoundByTitle = await this.holidayRepository.findOne({ where: { title: holiday.title } });
        if (holidayFoundByTitle) {
            return HttpStatus.CONFLICT;
        }

        const holidayEntity = new HolidayEntity();
        holidayEntity.title = holiday.title;
        holidayEntity.startDate = new Date(holiday.startDate);
        holidayEntity.endDate = new Date(holiday.endDate);
        holidayEntity.price = holiday.price;
        holidayEntity.description = holiday.description;

        // Check if location is already added into DataBase
        const foundLocation = await this.locationRepository.findOne({ where: { name: holiday.location } });
        if (foundLocation) {
            holiday.location = foundLocation;
            holidayEntity.location = holiday.location;
        }
        else {
            // Create location and save it into DataBase
            const location = new LocationEntity();
            location.name = holiday.location.toString();
            await this.locationRepository.create(location);
            await this.locationRepository.save([location]);
            holidayEntity.location = location;
        }
        // Save holiday into DataBase
        await this.holidayRepository.create(holidayEntity);
        await this.holidayRepository.save([holidayEntity]);
        return HttpStatus.CREATED;

    }

    async  findAll(): Promise<HolidayEntity[]> {
        return await this.holidayRepository.find();
    }
    async findOne(id) {
        const result: any = await this.holidayRepository.findOne(id);
        if (result) {
            return result;
        }
        return HttpStatus.NOT_FOUND;
    }
    async remove(id) {
        await this.holidayRepository.delete(id);
    }
}
