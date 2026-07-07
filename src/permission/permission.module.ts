import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [RolesModule],
  exports: [],
})
export class PermissionModule {}
