import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';


import { AuthController } from './auth.controller'
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '12h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
