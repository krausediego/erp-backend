import { UserEntity } from '@admin/access/users/user.entity';
import { UserStatus } from '@admin/access/users/user-status.enum';
import { UserMapper } from '@admin/access/users/users.mapper';
import { ErrorType } from '@common/enums';
import { DisabledUserException, InvalidCredentialsException } from '@common/http/exceptions';
import { HashHelper } from '@helpers';
import { UsersRepository } from '@modules/admin/access/users/users.repository';
import { Injectable } from '@nestjs/common';

import { AuthCredentialsRequestDto, JwtPayload, LoginResponseDto } from '../dtos';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private tokenService: TokenService,
  ) {}

  /**
   * User authentication
   * @param authCredentialsDto {AuthCredentialsRequestDto}
   * @returns {Promise<LoginResponseDto>}
   */
  public async login({ username, password }: AuthCredentialsRequestDto): Promise<LoginResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findUserByUsername(username);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const passwordMatch = await HashHelper.compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }
    if (user.status === UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }
    if (user.status === UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }

    const payload: JwtPayload = {
      id: user.id,
      organizationId: user?.organizations?.id,
      username: user.username,
    };
    const token = await this.tokenService.generateAuthToken(payload);

    const userDto = await UserMapper.toDto(user);
    const { permissions, roles } = await UserMapper.toDtoWithRelations(user);
    const additionalPermissions = permissions!.map(({ slug }) => slug);
    const mappedRoles = roles!.map(({ name, permissions }) => {
      const rolePermissions = permissions.map(({ slug }) => slug);
      return {
        name,
        permissions: rolePermissions,
      };
    });

    return {
      user: userDto,
      token,
      access: {
        additionalPermissions,
        roles: mappedRoles,
      },
    };
  }
}
