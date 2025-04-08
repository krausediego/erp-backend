import { ClientExistsException } from '@common/http/exceptions';
import { Pagination, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';

import { ClientMapper } from './client.mapper';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto, CreateClientRequestDto, UpdateClientRequestDto } from './dtos';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsRepository)
    private clientsRepository: ClientsRepository,
  ) {}

  /**
   * Get a paginated client list
   * @param pagination {PaginationRequest}
   * @param organizationId {string}
   * @returns {Promise<PaginationResponseDto<ClientResponseDto>>}
   */
  public async getClients(
    pagination: PaginationRequest,
    organizationId: string,
  ): Promise<PaginationResponseDto<ClientResponseDto>> {
    try {
      const [clientEntities, totalClients] = await this.clientsRepository.getClientsAndCount(
        pagination,
        organizationId,
      );

      const clientDtos = await Promise.all(clientEntities.map(ClientMapper.toDto));
      return Pagination.of(pagination, totalClients, clientDtos);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * Get client by id
   * @param id {string}
   * @returns {Promise<ClientResponseDto>}
   */
  public async getClientById(id: string): Promise<ClientResponseDto> {
    const clientEntity = await this.clientsRepository.findOneBy({ id });
    if (!clientEntity) {
      throw new NotFoundException();
    }

    return ClientMapper.toDto(clientEntity);
  }

  /**
   * Create new client
   * @param clientDto {CreateClientRequestDto}
   * @param organizationId {string}
   * @returns {Promise<ClientResponseDto>}
   */
  public async createClient(
    clientDto: CreateClientRequestDto,
    organizationId: string,
  ): Promise<ClientResponseDto> {
    try {
      let clientEntity = await this.clientsRepository.getClientAlreadyExists(
        organizationId,
        clientDto.phone,
        clientDto.document,
      );
      if (clientEntity) {
        throw new ClientExistsException();
      }

      clientEntity = ClientMapper.toCreateEntity(clientDto, organizationId);
      clientEntity = await this.clientsRepository.save({
        organization: { id: organizationId },
        ...clientDto,
      });

      return ClientMapper.toDto(clientEntity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * Update client by id
   * @param id {string}
   * @param clientDto {UpdateClientRequestDto}
   * @param organizationId {string}
   * @returns {Promise<ClientResponseDto>}
   */
  public async updateClient(
    id: string,
    clientDto: UpdateClientRequestDto,
    organizationId: string,
  ): Promise<ClientResponseDto> {
    try {
      let clientEntity = await this.clientsRepository.findOneBy({
        id,
        organization: { id: organizationId },
      });
      if (!clientEntity) {
        throw new NotFoundException();
      }
      clientEntity = await this.clientsRepository.getClientAlreadyExists(
        organizationId,
        clientDto.phone,
        clientDto.document,
      );
      if (clientEntity) {
        throw new ClientExistsException();
      }

      clientEntity = ClientMapper.toUpdateEntity(clientEntity, clientDto);
      clientEntity = await this.clientsRepository.save(clientEntity);

      return ClientMapper.toDto(clientEntity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
