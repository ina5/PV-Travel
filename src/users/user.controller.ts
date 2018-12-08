import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { Controller, Get, Post, HttpCode, Param, Body, Delete, HttpStatus, HttpException, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @HttpCode(201)
    @Post('register')
    create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createUserDTO: CreateUserDTO) {

        if (Object.keys(createUserDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'User is not valid',
            }, 403);
        }
        this.userService.create(createUserDTO);
        return 'User was created!';
    }
    @HttpCode(200)
    @Get('')
    findAll() {

        return this.userService.findAll();
    }
    @HttpCode(200)
    @Get(':id')
    findOne(@Param('id') id) {

        return this.userService.findOne(id);
    }

    @HttpCode(200)
    @Delete(':id')
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
