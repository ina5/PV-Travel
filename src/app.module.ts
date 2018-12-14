
import { HolidayModule } from './holidays/holiday.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';

@Module({

  imports: [UserModule, AuthModule, HolidayModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
