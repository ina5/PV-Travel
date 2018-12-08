import { HolidayModule } from './holidays/holiday.module';
import { UsersService } from './users/user.service';
import { UsersController } from './users/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HolidayModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule { }
