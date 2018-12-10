import { LoginController } from './../controllers/login.controller';
import { LoginService } from './../services/login.service';

import { AuthService } from './../services/auth.service';
import { AuthController } from './../controllers/auth.controller';
import { Module } from '@nestjs/common';
@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule { }