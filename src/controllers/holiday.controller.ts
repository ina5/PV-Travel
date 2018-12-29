
import { Controller, HttpCode, Post, Body, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateHolidayDTO } from 'src/dto/create-holiday.dto';
import { HolidaysService } from 'src/services/holiday.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('holidays')
export class HolidaysController {
    constructor(private readonly holidaysService: HolidaysService) { }
    @HttpCode(201)
    @Post('create')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
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
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    get(@Query() params) {
        if (Object.getOwnPropertyNames(params).length === 0) {
            return this.holidaysService.findAll();
        }
        return this.holidaysService.findByCriteria(params);
    }
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    findOne(@Param('id') id) {
        return this.holidaysService.findOne(id);
    }
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    remove(@Param('id') id) {
        return this.holidaysService.remove(id);
    }
    @HttpCode(200)
    @Post('update/:id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    update(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createHolidayDTO: CreateHolidayDTO,
        // tslint:disable-next-line:align
        @Param('id') id) {
        return this.holidaysService.update(id, createHolidayDTO);
    }
}
