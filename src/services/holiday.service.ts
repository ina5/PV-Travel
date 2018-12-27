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
        const holidayFoundByTitle = await this.holidayRepository.findOne({ where: { title: holiday.title } });
        if (holidayFoundByTitle) {
            return HttpStatus.CONFLICT;
        }
        const foundLocation = await this.locationRepository.findOne({ where: { name: holiday.location } });
        if (foundLocation) {
            holiday.location = foundLocation;
            await this.holidayRepository.create(holiday);
            await this.holidayRepository.save([holiday]);
            return HttpStatus.CREATED;
        }
        return HttpStatus.NOT_FOUND;

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
