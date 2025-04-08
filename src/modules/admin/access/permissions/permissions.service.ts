import { DBErrorCode } from '@common/enums';
import { PermissionExistsException } from '@common/http/exceptions';
import { Pagination, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';

import {
  CreatePermissionRequestDto,
  PermissionResponseDto,
  UpdatePermissionRequestDto,
} from './dtos';
import { PermissionMapper } from './permission.mapper';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsRepository)
    private permissionsRepository: PermissionsRepository,
  ) {}

  /**
   * Get a paginated permission list
   * @param pagination {PaginationRequest}
   * @returns {Promise<PaginationResponseDto<PermissionResponseDto>>}
   */
  public async getPermissions(
    pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<PermissionResponseDto>> {
    try {
      const [permissionEntities, totalPermissions] =
        await this.permissionsRepository.getPermissionsAndCount(pagination);

      const permissionDtos = await Promise.all(permissionEntities.map(PermissionMapper.toDto));
      return Pagination.of(pagination, totalPermissions, permissionDtos);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get permission by id
   * @param id {number}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async getPermissionById(id: number): Promise<PermissionResponseDto> {
    const permissionEntity = await this.permissionsRepository.findOneBy({ id });
    if (!permissionEntity) {
      throw new NotFoundException();
    }

    return PermissionMapper.toDto(permissionEntity);
  }

  /**
   * Create new permission
   * @param permissionDto {CreatePermissionRequestDto}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async createPermission(
    permissionDto: CreatePermissionRequestDto,
  ): Promise<PermissionResponseDto> {
    try {
      if (!permissionDto.slug) {
        throw new InternalServerErrorException('Slug is required');
      }

      let permissionEntity = PermissionMapper.toCreateEntity(permissionDto);

      permissionEntity = await this.permissionsRepository.save(permissionEntity);

      return PermissionMapper.toDto(permissionEntity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new PermissionExistsException(permissionDto.slug);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * Update permission by id
   * @param id {number}
   * @param permissionDto {UpdatePermissionRequestDto}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async updatePermission(
    id: number,
    permissionDto: UpdatePermissionRequestDto,
  ): Promise<PermissionResponseDto> {
    try {
      if (!permissionDto.slug) {
        throw new InternalServerErrorException('Slug is required');
      }

      let permissionEntity = await this.permissionsRepository.findOneBy({ id });
      if (!permissionEntity) {
        throw new NotFoundException();
      }

      permissionEntity = PermissionMapper.toUpdateEntity(permissionEntity, permissionDto);

      permissionEntity = await this.permissionsRepository.save(permissionEntity);

      return PermissionMapper.toDto(permissionEntity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new PermissionExistsException(permissionDto.slug);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
