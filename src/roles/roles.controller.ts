import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RoleService } from './roles.service';
import { AssignPermissionDto } from './dto/assignPermissionDto';

@Controller('api/roles')
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}

  @Post('create')
  public async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('assign-permission')
  public async assignPermissionToRole(@Body() dto: AssignPermissionDto) {
    return this.roleService.assignPermissionToRole(dto);
  }
}
