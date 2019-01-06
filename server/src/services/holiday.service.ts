import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidayEntity, LocationEntity, UserEntity } from './../data-base/entity';
import { Repository } from 'typeorm';
import { CreateHolidayDTO } from './../dto/create-holiday.dto';

@Injectable()
export class HolidaysService {
  constructor(@InjectRepository(HolidayEntity)
  private readonly holidayRepository: Repository<HolidayEntity>,
    // tslint:disable-next-line:align
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    // tslint:disable-next-line:align
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) { }

  async create(holiday: CreateHolidayDTO) {

    // Check if holiday is already exist (by Title)
    const holidayFoundByTitle = await this.holidayRepository.findOne({ where: { title: holiday.title } });
    if (holidayFoundByTitle) {
      throw new BadRequestException('This holiday already exists!');
    }

    const holidayEntity = new HolidayEntity();
    holidayEntity.title = holiday.title;
    holidayEntity.startDate = new Date(holiday.startDate);
    holidayEntity.endDate = new Date(holiday.endDate);
    holidayEntity.price = +holiday.price;
    holidayEntity.description = holiday.description;
    holidayEntity.pictureUrl = holiday.pictureUrl;

    // Check if location is already added into DataBase
    const foundLocation = await this.locationRepository.findOne({ where: { name: holiday.location } });
    await this.checkForLocation(foundLocation, holiday, holidayEntity);
    // Save holiday into DataBase
    await this.holidayRepository.create(holidayEntity);
    await this.holidayRepository.save([holidayEntity]);

    return holidayEntity;

  }
  async  findAll(): Promise<HolidayEntity[]> {
    return await this.holidayRepository.find();
  }
  async findOne(id): Promise<HolidayEntity> {
    const foundHoliday = await this.holidayRepository.findOne(id);
    if (foundHoliday) {
      return foundHoliday;
    }

    throw new BadRequestException('This holiday does not exist!');
  }
  async remove(id) {
    const holidayFoundById = await this.holidayRepository.findByIds(id);
    if (holidayFoundById) {
      await this.holidayRepository.delete(id);
      return 'Delete successful';
    }

    throw new BadRequestException('This holiday does not exist!');
  }
  async findByCriteria(query) {
    const searchCriteria1 = Object.keys(query)[0];
    const searchCriteria2 = Object.keys(query)[1];
    const searchValue1 = query[searchCriteria1];
    const searchValue2 = query[searchCriteria2];

    const foundIdLocation = (await this.locationRepository.findOne({ where: { name: searchValue1 } })).id;

    const foundHoliday = await this.holidayRepository.find({ where: { locationId: foundIdLocation, price: searchValue2 } });
    if (foundHoliday) {
      return foundHoliday;
    }

    throw new BadRequestException('This holiday does not exist!');

  }
  async update(idHoliday, createHolidayDTO) {
    const foundHolidayById = await this.holidayRepository.findOne({ where: { id: idHoliday } });
    if (foundHolidayById) {
      foundHolidayById.title = createHolidayDTO.title;
      foundHolidayById.startDate = createHolidayDTO.startDate;
      foundHolidayById.endDate = createHolidayDTO.endDate;
      foundHolidayById.price = createHolidayDTO.price;
      foundHolidayById.description = createHolidayDTO.description;

      // Check if location is already added into DataBase
      const foundLocation = await this.locationRepository.findOne({ where: { name: createHolidayDTO.location } });
      await this.checkForLocation(foundLocation, createHolidayDTO, foundHolidayById);

      await this.holidayRepository.update(idHoliday, foundHolidayById);

      return foundHolidayById;
    }
    throw new BadRequestException('This holiday does not exist!');
  }
  private async checkForLocation(foundLocation: LocationEntity, holiday: CreateHolidayDTO, holidayEntity: HolidayEntity): Promise<string> {
    if (foundLocation) {
      holiday.location = foundLocation;
      holidayEntity.location = holiday.location;

      return 'Location found.';
    }
    else {
      // Create location and save it into DataBase
      const location = new LocationEntity();
      location.name = holiday.location.toString();
      await this.locationRepository.create(location);
      await this.locationRepository.save([location]);
      holidayEntity.location = location;

      return 'Location created.';
    }
  }

  async bookHoliday(holidayId: string, userId: string) {

    const foundUserById = await this.userRepository.findOne({ where: { id: userId } });
    const foundHolidayById = await this.holidayRepository.findOne({ where: { id: holidayId } });

    if (!foundUserById || !foundHolidayById) {
      throw new BadRequestException('Holiday not found.');
    }

    if (!foundUserById.holidays.find((holiday: HolidayEntity) => holiday.id === foundHolidayById.id)) {
      foundUserById.holidays.push(foundHolidayById);
      await this.userRepository.save(foundUserById);
    }

    return foundHolidayById;
  }
}
