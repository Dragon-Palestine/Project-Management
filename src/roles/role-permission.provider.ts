import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entitys/role.entity';
import { Permission } from 'src/permission/permission.entity';
import { RolePermission } from './entitys/role-permission.entity';
import { AssignPermissionDto } from './dto/assignPermissionDto';

@Injectable()
export class RolePermissionProvider {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,
  ) {}

  public async assignPermissionToRole(payload: AssignPermissionDto) {
    const { roleId, permissionId } = payload;

    const role = await this.roleRepo.findOne({ where: { id: String(roleId) } });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    const permission = await this.permissionRepo.findOne({
      where: { id: String(permissionId) },
    });
    if (!permission) {
      throw new NotFoundException(
        `Permission with id ${permissionId} not found`,
      );
    }

    return await this.rolePermissionRepo.save(
      this.rolePermissionRepo.create({
        role,
        permission,
      }),
    );
  }
}
