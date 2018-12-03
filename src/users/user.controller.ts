import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './user.service';
// import { ValidationPipe } from '../common/validation.pipe';
import { Controller, Get, Post, HttpCode, Param, Body, Delete, HttpStatus, HttpException, UsePipes } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @HttpCode(204)
    @Post()
    // @UsePipes(new ValidationPipe())
    create(@Body() createUserDTO: CreateUserDTO) {

        if (Object.keys(createUserDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'User is not valid',
            }, 403);
        }
        return this.userService.create(createUserDTO);
    }
    @HttpCode(200)
    @Get()
    findAll() {
        if (this.userService) {
            return this.userService.findAll();
        }
        return HttpStatus.NOT_FOUND;
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