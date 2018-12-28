
import { Controller, HttpCode, Post, Body, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete, Query } from '@nestjs/common';
import { CreateHolidayDTO } from 'src/dto/create-holiday.dto';
import { HolidaysService } from 'src/services/holiday.service';

@Controller('holidays')
export class HolidaysController {
    constructor(private readonly holidaysService: HolidaysService) { }
    @HttpCode(201)
    @Post('create')
    async create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createHolidayDTO: CreateHolidayDTO) {

        if (Object.keys(createHolidayDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Holiday is not valid',
            }, 403);
        }
        const holiday = await this.holidaysService.create(createHolidayDTO);
        return holiday;
    }
    @HttpCode(200)
    @Get()
    get(@Query() params) {
        if (Object.getOwnPropertyNames(params).length === 0) {
            return this.holidaysService.findAll();
        }
        return this.holidaysService.findByCriteria(params);
    }
    @HttpCode(200)
    @Get(':id')
    findOne(@Param('id') id) {
        return this.holidaysService.findOne(id);
    }
    @HttpCode(200)
    @Delete(':id')
    remove(@Param('id') id) {
        return this.holidaysService.remove(id);
    }
}
