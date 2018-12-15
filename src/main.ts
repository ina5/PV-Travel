import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(app.get(ConfigService).port);
}
bootstrap();
