import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { Role } from './entitys/role.entity';
import { RolePermission } from './entitys/role-permission.entity';
import { Permission } from 'src/permission/permission.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, RolePermission, Permission])],
  exports: [TypeOrmModule],
})
export class RolesModule {}
