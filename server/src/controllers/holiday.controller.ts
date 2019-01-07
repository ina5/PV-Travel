import { Controller, HttpCode, Post, Body, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete, Query, UseGuards, UseInterceptors, FileInterceptor, UploadedFile, BadRequestException, Request } from '@nestjs/common';
import { HolidaysService } from './../services/holiday.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../common/guards/admin.guard';
import { FileService } from './../common/core/file.service';
import { join } from 'path';
import { unlink } from 'fs';
import { CreateHolidayDTO } from './../dto/create-holiday.dto';

@Controller('holidays')
export class HolidaysController {
    constructor(private readonly holidaysService: HolidaysService) { }
    @HttpCode(201)
    @Post('create')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @UseInterceptors(FileInterceptor('picture', {
        limits: FileService.fileLimit(1, 2 * 1024 * 1024),
        storage: FileService.storage(['public', 'images']),
        fileFilter: (req, file, cb) => FileService.fileFilter(req, file, cb, '.png', '.jpg'),
    }))
    async create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createHolidayDTO: CreateHolidayDTO,
        // tslint:disable-next-line:align
        @UploadedFile() file): Promise<string> {
        console.log(createHolidayDTO);
        console.log(file);
        if (Object.keys(createHolidayDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Holiday is not valid',
            }, 403);
        }
        const folder = join('.', 'public', 'uploads');
        console.log(folder);
        if (!file) {
            createHolidayDTO.pictureUrl = join(folder, 'default.png');
        } else {
            createHolidayDTO.pictureUrl = join(folder, file.filename);
        }
        try {

            await this.holidaysService.create(createHolidayDTO);
            return 'Holiday was created';
        } catch (error) {
            await new Promise((resolve, reject) => {

                // Delete the file if holiday not found
                if (file) {
                    unlink(join('.', file.path), (err) => {
                        if (err) {
                            reject(error.message);
                        }
                        resolve();
                    });
                }

                resolve();
            });

            return (error.message);
        }
    }
    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard('jwt'))
    get(@Query() params) {
        if (Object.getOwnPropertyNames(params).length === 0) {
            return this.holidaysService.findAll();
        }

        return this.holidaysService.findByCriteria(params);
    }
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
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

    @HttpCode(200)
    @Post('book')
    @UseGuards(AuthGuard('jwt'))
    async book(@Body() body, @Request() req) {
        console.log(body);
        if (body.holidayId === undefined) {
            throw new BadRequestException('Wrong credentials.');
        }
        try {
            return await this.holidaysService.bookHoliday(body.holidayId, req.user.id);
        }
        catch (error) {
            return error.message;
        }
    }
    @HttpCode(200)
    @Get('booked')
    @UseGuards(AuthGuard('jwt'))
    async booked(@Request() req) {
        if (req.user.id === undefined) {
            throw new BadRequestException('Wrong credentials.');
        }
        try {
            return await this.holidaysService.getUserHolidays(req.user.id);
        }
        catch (error) {
            return error.message;
        }
    }
}
