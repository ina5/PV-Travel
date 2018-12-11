import { LoginService } from './../services/login.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user.module';
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
