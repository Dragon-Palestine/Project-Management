import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  userName?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;
}
