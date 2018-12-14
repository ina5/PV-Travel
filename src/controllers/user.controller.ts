import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersService } from '../services/user.service';
import { Controller, Get, Post, HttpCode, Param, Body, Delete, HttpStatus, HttpException, ValidationPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @HttpCode(201)
    @Post('register')
    // @Roles('admin', 'client')
    // @UseGuards(RolesGuard)

    create(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createUserDTO: CreateUserDTO) {
        console.log(createUserDTO);
        // if (Object.keys(createUserDTO).length === 0) {
        //     throw new HttpException({
        //         status: HttpStatus.FORBIDDEN,
        //         error: 'User is not valid',
        //     }, 403);
        // }
        this.userService.create(createUserDTO);
        return 'User was created!';
    }
    @HttpCode(200)
    @Get('')
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    findAll() {

        return this.userService.findAll();
    }
    @HttpCode(200)
    @Get(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    findOne(@Param('id') id) {

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
