import { LoginModule } from './../modules/login.module';

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [LoginModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secretOrPrivateKey: 'pvproject',
        signOptions: {
            expiresIn: 3600, // Entirely optional
        },
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule { }
