import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/CreatePermissionDto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';

@Controller('api/permission')
export class PermissionController {
  public constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('permissions.create')
  @Post('create')
  public createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
