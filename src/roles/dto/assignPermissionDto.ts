import { IsNumber } from 'class-validator';

export class AssignPermissionDto {
  @IsNumber()
  roleId!: number;

  @IsNumber()
  permissionId!: number;
}
