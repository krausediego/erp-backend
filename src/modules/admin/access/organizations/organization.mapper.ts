import {
  CreateOrganizationRequestDto,
  OrganizationResponseDto,
  UpdateOrganizationRequestDto,
} from './dto';
import { OrganizationEntity } from './organization.entity';

export class OrganizationMapper {
  public static toDto(entity: OrganizationEntity): OrganizationResponseDto {
    const dto = new OrganizationResponseDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.tradingName = entity.tradingName;
    dto.document = entity.document;
    dto.email = entity.email;
    dto.phone = entity.phone;
    dto.isActive = entity.isActive;
    return dto;
  }

  public static toCreateEntity(dto: CreateOrganizationRequestDto): OrganizationEntity {
    const entity = new OrganizationEntity();

    entity.name = dto.name;
    entity.tradingName = dto.tradingName;
    entity.document = dto.document;
    entity.email = dto.email;
    entity.phone = dto.phone;
    return entity;
  }

  public static toUpdateEntity(
    entity: OrganizationEntity,
    dto: UpdateOrganizationRequestDto,
  ): OrganizationEntity {
    entity.name = dto.name;
    entity.tradingName = dto.tradingName;
    entity.document = dto.document;
    entity.email = dto.email;
    entity.phone = dto.phone;
    entity.isActive = dto.isActive;
    return entity;
  }
}
