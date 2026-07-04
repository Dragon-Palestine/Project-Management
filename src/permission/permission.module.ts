import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RolePermission } from 'src/roles/entitys/role-permission.entity';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  exports: [],
})
export class PermissionModule {}
