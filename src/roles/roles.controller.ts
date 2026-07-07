import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RoleService } from './roles.service';
import { AssignPermissionDto } from './dto/assignPermissionDto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { RolePermissionProvider } from './role-permission.provider';

@Controller('api/roles')
export class RoleController {
  public constructor(
    private readonly roleService: RoleService,
    private readonly rolePermissionProvider: RolePermissionProvider,
  ) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('roles.create')
  @Post('create')
  public async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('roles.update')
  @Post('assign-permission')
  public async assignPermissionToRole(@Body() dto: AssignPermissionDto) {
    return this.rolePermissionProvider.assignPermissionToRole(dto);
  }
}
