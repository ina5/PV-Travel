
import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UserEntity } from 'src/data-base/entity';
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([RoleEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule { }
