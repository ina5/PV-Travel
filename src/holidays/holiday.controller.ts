import { HolidaysService } from './holiday.service';
import { Controller, HttpCode, Post, Body, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { CreateHolidayDTO } from './dto/create-holiday.dto';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}
  @HttpCode(201)
    @Post('create')
    create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createHolidayDTO: CreateHolidayDTO) {

        if (Object.keys(createHolidayDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Holiday is not valid',
            }, 403);
        }
        this.holidaysService.create(createHolidayDTO);
        return 'Holiday was created!';
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
