import { CustomRepository } from '@database/typeorm-ex.decorator';
import { Repository } from 'typeorm';

import { OrganizationEntity } from './organization.entity';

@CustomRepository(OrganizationEntity)
export class OrganizationsRepository extends Repository<OrganizationEntity> {}
