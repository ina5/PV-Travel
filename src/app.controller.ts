import { Get, Controller, Render, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root(): any {
    return { name: 'user' };
  }
}
