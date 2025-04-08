import { ClientEntity } from './client.entity';
import { ClientResponseDto, CreateClientRequestDto, UpdateClientRequestDto } from './dtos';

export class ClientMapper {
  public static toDto(entity: ClientEntity): ClientResponseDto {
    const dto = new ClientResponseDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.phone = entity.phone;
    dto.document = entity.document;
    dto.email = entity.email;
    dto.status = entity.status;
    return dto;
  }

  public static toCreateEntity(dto: CreateClientRequestDto, organizationId: string): ClientEntity {
    const entity = new ClientEntity();

    entity.name = dto.name;
    entity.phone = dto.phone;
    entity.document = dto.document;
    entity.email = dto.email;
    entity.organization = { id: organizationId } as any;
    return entity;
  }

  public static toUpdateEntity(entity: ClientEntity, dto: UpdateClientRequestDto): ClientEntity {
    entity.name = dto.name;
    entity.phone = dto.phone;
    entity.document = dto.document;
    entity.email = dto.email;
    entity.status = dto.status;
    return entity;
  }
}
