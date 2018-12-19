import { UserEntity } from 'src/data-base/entity/user.entity';
import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule { }
