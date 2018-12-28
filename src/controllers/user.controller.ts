import { UsersService } from '../services/user.service';
import { Controller, Get, Post, HttpCode, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard())
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    get(@Query() params) {
        if (Object.getOwnPropertyNames(params).length === 0) {
            return this.userService.findAll();
        }
        return this.userService.findByCriteria(params);
    }
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
