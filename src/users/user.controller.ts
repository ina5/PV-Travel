import { User } from './interfaces/user.interface';
import { Controller, Get, Post, HttpCode, Param, Body, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @HttpCode(204)
    @Post()
    async create(@Body() CreateUserDto: User) {
        return 'This action adds a new cat';
    }
    @HttpCode(200)
    @Get()
    findAll() {
        return 'This action returns all users';
    }
    @HttpCode(200)
    @Get(':id')
    findOne(@Param('id') id) {
        return `This action returns a #${id} user`;
    }
    @HttpCode(200)
    @Delete(':id')
    remove(@Param('id') id) {
        return `This action removes a #${id} user`;
    }
}