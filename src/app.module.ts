
import { HolidayModule } from './holidays/holiday.module';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';
import { ConfigModule } from './config/config.module';
import { DataModule } from './data-base/data.module';

@Module({

  imports: [UserModule, AuthModule, HolidayModule, ConfigModule, HttpModule, DataModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
