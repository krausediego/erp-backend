import { CustomRepository } from '@database/typeorm-ex.decorator';
import { PaginationRequest } from '@libs/pagination';
import { Repository } from 'typeorm';

import { RoleEntity } from './role.entity';

@CustomRepository(RoleEntity)
export class RolesRepository extends Repository<RoleEntity> {
  /**
   * Get roles list
   * @param pagination {PaginationRequest}
   * @returns [roleEntities: RoleEntity[], totalToles: number]
   */
  public async getRolesAndCount(
    pagination: PaginationRequest,
  ): Promise<[roleEntities: RoleEntity[], totalRoles: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { search },
    } = pagination;

    const query = this.createQueryBuilder('r')
      .innerJoinAndSelect('r.permissions', 'p')
      .skip(skip)
      .take(take)
      .orderBy(order);

    if (search) {
      query.where('name ILIKE :search', { search: `%${search}%` });
    }

    return query.getManyAndCount();
  }
}
