import { CustomRepository } from '@database/typeorm-ex.decorator';
import { PaginationRequest } from '@libs/pagination';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@CustomRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  /**
   * Get users list
   * @param pagination {PaginationRequest}
   * @returns [userEntities: UserEntity[], totalUsers: number]
   */
  public async getUsersAndCount(
    pagination: PaginationRequest,
  ): Promise<[userEntities: UserEntity[], totalUsers: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { search },
    } = pagination;
    const query = this.createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .leftJoinAndSelect('u.permissions', 'p')
      .skip(skip)
      .take(take)
      .orderBy(order);

    if (search) {
      query.where(
        `
            u.username ILIKE :search
            OR u.first_name ILIKE :search
            OR u.last_name ILIKE :search
            `,
        { search: `%${search}%` },
      );
    }

    return query.getManyAndCount();
  }

  /**
   * Find user by username
   * @param username {string}
   * @returns Promise<UserEntity>
   */
  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return this.createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'r', 'r.active = true')
      .leftJoinAndSelect('r.permissions', 'rp', 'rp.active = true')
      .leftJoinAndSelect('u.permissions', 'p', 'p.active = true')
      .leftJoinAndSelect('u.organizations', 'o', 'o.is_active = true')
      .where('u.username = :username', { username })
      .getOne();
  }
}
