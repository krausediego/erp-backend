import { BaseEntity } from '@database/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permissions', schema: 'admin' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'slug', type: 'varchar', nullable: false, unique: true, length: 60 })
  slug: string;

  @Column({ name: 'description', type: 'varchar', nullable: false, length: 160 })
  description: string;

  @Column({ name: 'active', type: 'boolean', nullable: false, default: true })
  active: boolean;

  constructor(permission?: Partial<PermissionEntity>) {
    super();
    Object.assign(this, permission);
  }
}
