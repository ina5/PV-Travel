import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from 'src/data-base/entity';
import { LocationsService } from 'src/services/location.service';
import { LocationsController } from 'src/controllers/location.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LocationEntity])],
    controllers: [LocationsController],
    providers: [LocationsService],
})

export class LocationModule { }