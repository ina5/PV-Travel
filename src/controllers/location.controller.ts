import { CreateLocationDTO } from 'src/dto/create-location.dto';
import { LocationsService } from 'src/services/location.service';
import { Controller, HttpCode, Post, ValidationPipe, Body, HttpStatus, Get } from '@nestjs/common';
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @HttpCode(201)
    @Post('create')
    async create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) location: CreateLocationDTO): Promise<any> {
        try {
            await this.locationsService.create(location);
            return HttpStatus.CREATED;
        } catch (error) {
            await new Promise((resolve, reject) => {
                resolve();
            });
            return (error.message);
        }
    }
    @HttpCode(200)
    @Get()
    findAll() {
        if (this.locationsService) {
            return this.locationsService.findAll();
        }
        return HttpStatus.NOT_FOUND;
    }
}