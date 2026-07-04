import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission } from 'src/permission/permission.entity';
import { TIMESTAMP } from 'src/utils/constants';

@Entity('role_permissions')
@Unique(['role', 'permission'])
export class RolePermission {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  permission!: Permission;

  @CreateDateColumn({
    type: TIMESTAMP,
  })
  createdAt!: Date;
}
