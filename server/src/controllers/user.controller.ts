import { AdminGuard } from './../common/guards/admin.guard';
import { UsersService } from '../services/user.service';
import { Controller, Get, Post, HttpCode, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    get(@Query() params) {
        if (Object.getOwnPropertyNames(params).length === 0) {
            return this.userService.findAll();
        }

        return this.userService.findByCriteria(params);
    }
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
