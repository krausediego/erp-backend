import { Body, Controller, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SkipAuth } from '.';
import {
  AuthCredentialsRequestDto,
  LoginResponseDto,
  TokenDto,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto,
} from './dtos';
import { AuthService, TokenService } from './services';

@SkipAuth()
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const loginResponse = await this.authService.login(authCredentialsDto);

    response.cookie('access_token', loginResponse.token.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 5,
    });

    response.cookie('refresh_token', loginResponse.token.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return loginResponse;
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/refresh')
  async getNewToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenDto> {
    const refreshToken = request.cookies?.refresh_token;
    const refreshResponse = await this.tokenService.generateRefreshToken(refreshToken);

    response.cookie('access_token', refreshResponse.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 5,
    });

    return refreshResponse;
  }

  @ApiOperation({ description: 'Validate token' })
  @ApiOkResponse({ description: 'Validation was successful' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/validate')
  async validateToken(
    @Body(ValidationPipe) validateToken: ValidateTokenRequestDto,
  ): Promise<ValidateTokenResponseDto> {
    const { token } = validateToken;
    return this.tokenService.validateToken(token);
  }
}
