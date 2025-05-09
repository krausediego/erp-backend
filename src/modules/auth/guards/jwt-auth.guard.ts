import { InvalidTokenException } from '@common/http/exceptions';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { SKIP_AUTH } from '../constants';
import { TokenType } from '../enums';
import { TokenService } from '../services';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {
    super();
  }

  /**
   * Verify the token is valid
   * @param context {ExecutionContext}
   * @returns super.canActivate(context)
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request?.cookies?.access_token;
    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const payload = this.tokenService.verifyToken(accessToken, TokenType.AccessToken);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return super.canActivate(context);
  }

  /**
   * Handle request and verify if exist and error on there's not user
   * @param error
   * @param user
   * @return user || error
   */
  handleRequest(error, user) {
    if (error || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
