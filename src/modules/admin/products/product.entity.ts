import { BaseEntity } from '@database/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { OrganizationEntity } from '../access/organizations/organization.entity';

@Entity({ name: 'products', schema: 'admin' })
export class ProductEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'sku',
    type: 'varchar',
    nullable: false,
  })
  sku: string;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    nullable: false,
  })
  salePrice: number;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    nullable: false,
  })
  costPrice: number;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  constructor(product?: Partial<ProductEntity>) {
    super();
    Object.assign(this, product);
  }
}
