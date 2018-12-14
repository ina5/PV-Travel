import { LoginService } from './../services/login.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from './auth.service';
import { LoginController } from '../controllers/login.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'pvproject',
            signOptions: {
                expiresIn: 3600, // Entirely optional
            },
        }),
    ],
    controllers: [AuthController, LoginController],
    providers: [AuthService, LoginService],
})
export class AuthModule { }
