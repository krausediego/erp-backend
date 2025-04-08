import { DBErrorCode } from '@common/enums';
import { OrganizationExistsException } from '@common/http/exceptions';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';

import {
  CreateOrganizationRequestDto,
  OrganizationResponseDto,
  UpdateOrganizationRequestDto,
} from './dto';
import { OrganizationMapper } from './organization.mapper';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsRepository)
    private organizationsRepository: OrganizationsRepository,
  ) {}

  /**
   * Get a organization by id
   * @param id {string}
   * @returns {Promise<OrganizationResponseDto>}
   */
  public async getOrganizationById(id: string): Promise<OrganizationResponseDto> {
    const organizationEntity = await this.organizationsRepository.findOneBy({ id });
    if (!organizationEntity) {
      throw new NotFoundException();
    }

    return OrganizationMapper.toDto(organizationEntity);
  }

  /**
   * Create new organization
   * @param organizationDto {CreateOrganizationRequestDto}
   * @returns {Promise<OrganizationResponseDto>}
   */
  public async createOrganization(
    organizationDto: CreateOrganizationRequestDto,
  ): Promise<OrganizationResponseDto> {
    try {
      let organizationEntity = OrganizationMapper.toCreateEntity(organizationDto);
      organizationEntity = await this.organizationsRepository.save(organizationEntity);

      return OrganizationMapper.toDto(organizationEntity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new OrganizationExistsException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * Update organization by id
   * @param id {string}
   * @param organizationDto {UpdateOrganizationRequestDto}
   * @returns {Promise<OrganizationResponseDto>}
   */
  public async updateOrganization(
    id: string,
    organizationDto: UpdateOrganizationRequestDto,
  ): Promise<OrganizationResponseDto> {
    try {
      let organizationEntity = await this.organizationsRepository.findOneBy({ id });
      if (!organizationEntity) {
        throw new NotFoundException();
      }
      organizationEntity = OrganizationMapper.toUpdateEntity(organizationEntity, organizationDto);
      organizationEntity = await this.organizationsRepository.save(organizationEntity);

      return OrganizationMapper.toDto(organizationEntity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new OrganizationExistsException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
