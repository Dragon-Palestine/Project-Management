import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { TIMESTAMP } from 'src/utils/constants';
import { User } from 'src/users/user.entity';
import { RolePermission } from './role-permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isSystem!: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn({
    type: TIMESTAMP,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: TIMESTAMP,
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: TIMESTAMP,
    nullable: true,
  })
  deletedAt?: Date;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions!: RolePermission[];
}
