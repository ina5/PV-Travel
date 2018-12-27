
import { HolidayModule } from './modules/holiday.module';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({

  imports: [UserModule, AuthModule, HolidayModule, ConfigModule, HttpModule,
    TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data-base/entity/*.entity.ts'],
    }),
    imports: [ConfigModule],
    inject: [ConfigService],
})],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
