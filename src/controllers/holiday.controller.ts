
import { Controller, HttpCode, Post, Body, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete } from '@nestjs/common';
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
    })) holiday: CreateHolidayDTO): Promise<any> {

        // if (Object.keys(createHolidayDTO).length === 0) {
        //     throw new HttpException({
        //         status: HttpStatus.FORBIDDEN,
        //         error: 'Holiday is not valid',
        //     }, 403);
        // }
        // this.holidaysService.create(createHolidayDTO);
        // return 'Holiday was created!';
        try {
            await this.holidaysService.create(holiday);
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
        if (this.holidaysService) {
            return this.holidaysService.findAll();
        }
        return HttpStatus.NOT_FOUND;
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
