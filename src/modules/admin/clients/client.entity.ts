import { BaseEntity } from '@database/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { OrganizationEntity } from '../access/organizations/organization.entity';
import { ClientStatus } from './client-status.enum';

@Entity({ name: 'clients', schema: 'admin' })
export class ClientEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  phone: string;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 18,
    nullable: true,
  })
  document?: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
  })
  email?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ClientStatus,
    default: ClientStatus.Active,
    nullable: false,
  })
  status: ClientStatus;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  constructor(client?: Partial<ClientEntity>) {
    super();
    Object.assign(this, client);
  }
}
