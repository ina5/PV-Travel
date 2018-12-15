import { ConfigService } from 'src/config/config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [ConfigModule,
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
            inject: [ConfigService],
        }),
    ],
})

export class DataModule {
}