import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/createRoleDto';
import { Repository } from 'typeorm';
import { Role } from './entitys/role.entity';
import { AssignPermissionDto } from './dto/assignPermissionDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  public async create(payload: CreateRoleDto) {
    return await this.roleRepo.save(payload);
  }

  public async assignPermissionToRole(payload: AssignPermissionDto) {
    const { roleId, permissionId } = payload;
    return await this.roleRepo
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(roleId)
      .add(permissionId);
  }
}
