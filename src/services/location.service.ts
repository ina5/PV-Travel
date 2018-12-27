import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/data-base/entity';
import { Repository } from 'typeorm';
import { CreateLocationDTO } from 'src/dto/create-location.dto';

@Injectable()
export class LocationsService {
    constructor(@InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>) { }

    async create(location: CreateLocationDTO) {
        const locationFoundByName = await this.locationRepository.findOne({ where: { name: location.name } });
        if (locationFoundByName) {
            return HttpStatus.CONFLICT;
        }
        await this.locationRepository.create(location);
        await this.locationRepository.save([location]);
        return HttpStatus.CREATED;
    }
    async findAll(): Promise<LocationEntity[]> {
        return await this.locationRepository.find();
    }
}