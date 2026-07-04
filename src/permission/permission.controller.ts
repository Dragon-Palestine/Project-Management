import { Body, Controller, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/CreatePermissionDto';

@Controller('api/permission')
export class PermissionController {
  public constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  public createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
