import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  @IsOptional()
  description?: string;
}
