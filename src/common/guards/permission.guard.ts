import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { RolePermission } from 'src/roles/entitys/role-permission.entity';
import { Repository } from 'typeorm';
import { PERMISSION_KEY } from 'src/utils/constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { role?: string };
    }>();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not found');
    }

    const rolePermissions = await this.rolePermissionRepo.find({
      where: {
        role: {
          name: user.role,
        },
      },
      relations: {
        permission: true,
      },
    });

    const permissions = rolePermissions.map(
      (rolePermission) => rolePermission.permission.code,
    );

    const hasPermission = permissions.includes(requiredPermission);

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
