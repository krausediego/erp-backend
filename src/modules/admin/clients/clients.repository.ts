import { CustomRepository } from '@database/typeorm-ex.decorator';
import { PaginationRequest } from '@libs/pagination';
import { Repository } from 'typeorm';

import { ClientEntity } from './client.entity';

@CustomRepository(ClientEntity)
export class ClientsRepository extends Repository<ClientEntity> {
  /**
   * Get client list
   * @param pagination {PaginationRequest}
   * @param organizationId {string}
   * @returns clientEntities[] and totalClients
   */
  public async getClientsAndCount(
    pagination: PaginationRequest,
    organizationId: string,
  ): Promise<[clientEntities: ClientEntity[], totalClients: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { search },
    } = pagination;
    const query = this.createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'u')
      .where('c.organization_id = :organizationId', { organizationId })
      .skip(skip)
      .take(take)
      .orderBy(order);

    if (search) {
      query.andWhere('name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return query.getManyAndCount();
  }

  /**
   * Get client phone or document exists
   * @param organizationId {string}
   * @param phone {string}
   * @param document {string}
   * @returns {Promise<ClientEntity | null>}
   */
  public async getClientAlreadyExists(
    organizationId: string,
    phone: string,
    document: string,
  ): Promise<ClientEntity | null> {
    return this.createQueryBuilder('c')
      .where('c.organization_id = :organizationId AND c.phone = :phone', { organizationId, phone })
      .orWhere('c.organization_id = :organizationId AND c.document = :document', {
        organizationId,
        document,
      })
      .getOne();
  }
}
