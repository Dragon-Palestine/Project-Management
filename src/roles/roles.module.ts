import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { Role } from './entitys/role.entity';
import { RolePermission } from './entitys/role-permission.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  exports: [],
})
export class RolesModule {}
