import { RolePermission } from 'src/roles/entitys/role-permission.entity';
import { TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  module!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  action!: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  code!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn({
    type: TIMESTAMP,
  })
  createdAt?: Date;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}
