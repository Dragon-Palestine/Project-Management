import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolePermission } from 'src/roles/entitys/role-permission.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  exports: [],
})
export class UsersModule {}
