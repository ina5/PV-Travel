import { ConfigService } from 'src/config/config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [ConfigModule,
    ],
})

export class DataModule {
}