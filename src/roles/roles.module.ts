import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { Role } from './entitys/role.entity';
import { RolePermission } from './entitys/role-permission.entity';
import { Permission } from 'src/permission/permission.entity';

import { RolePermissionProvider } from './role-permission.provider';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RolePermissionProvider],
  imports: [TypeOrmModule.forFeature([Role, RolePermission, Permission])],
  exports: [TypeOrmModule, RolePermissionProvider],
})
export class RolesModule {}
