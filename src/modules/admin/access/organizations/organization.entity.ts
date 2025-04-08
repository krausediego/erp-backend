import { BaseEntity } from '@database/entities';
import { ClientEntity } from '@modules/admin/clients/client.entity';
import { ProductEntity } from '@modules/admin/products/product.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Entity({ name: 'organizations', schema: 'admin' })
export class OrganizationEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'trading_name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  tradingName: string;

  @Column({
    name: 'document',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  document: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => UserEntity, (user) => user.organizations)
  users: UserEntity[];

  @OneToMany(() => ClientEntity, (client) => client.organization)
  clients: ClientEntity[];

  @OneToMany(() => ProductEntity, (product) => product.organization)
  products: ProductEntity[];
}
