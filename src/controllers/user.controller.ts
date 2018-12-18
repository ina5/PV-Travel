import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersService } from '../services/user.service';
import { Controller, Get, Post, HttpCode, Param, Body, Delete, HttpStatus, HttpException, ValidationPipe, UseGuards } from '@nestjs/common';
import {getManager, getRepository} from 'typeorm';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/data-base/entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(200)
    @Get('')
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    findAll() {
        return getManager().find(User);
        return this.userService.findAll();
    }
    @HttpCode(200)
    @Get(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    findOne(@Param('id') id: number) {
        return getRepository(User).findOne(id);
        return this.userService.findOne(id);
    }

    @HttpCode(200)
    @Delete(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
