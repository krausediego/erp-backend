import { TypeOrmExModule } from '@database/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersRepository } from '../admin/access/users/users.repository';
import { AuthController } from './auth.controller';
import { JwtAuthGuard, PermissionsGuard } from './guards';
import { JwtStrategy } from './jwt.strategy';
import { AuthService, TokenService } from './services';

@Module({
  imports: [
    ConfigModule,
    TypeOrmExModule.forCustomRepository([UsersRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [JwtStrategy, PassportModule, TokenService, AuthService],
})
export class AuthModule {}
