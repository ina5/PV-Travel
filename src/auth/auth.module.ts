
import { ConfigModule } from './../config/config.module';
import { LoginService } from './../services/login.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from '../controllers/auth.controller';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.jwtSecret,
                signOptions: {
                    expiresIn: configService.jwtExpireTime,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LoginService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
