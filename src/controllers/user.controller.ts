
import { Controller, Get, HttpCode, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UsersService } from 'src/services/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(200)
    @Get()
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
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @HttpCode(200)
    @Delete(':id')
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
