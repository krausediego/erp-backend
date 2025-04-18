import { ErrorType } from '@common/enums';
import {} from '@common/http/';
import { DisabledUserException, InvalidCredentialsException } from '@common/http/exceptions';
import { UserEntity } from '@modules/admin/access/users/user.entity';
import { UserStatus } from '@modules/admin/access/users/user-status.enum';
import { UsersRepository } from '@modules/admin/access/users/users.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './dtos/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TOKEN_SECRET') ?? '',
    });
  }

  async validate({ username }: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    if (user.status === UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }
    if (user.status === UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }
    return user;
  }
}
