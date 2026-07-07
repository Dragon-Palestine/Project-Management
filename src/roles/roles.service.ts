import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/createRoleDto';
import { Repository } from 'typeorm';
import { Role } from './entitys/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  public async create(payload: CreateRoleDto) {
    return await this.roleRepo.save(payload);
  }
}
