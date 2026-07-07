import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/createUserDto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/updateUserDto';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';

@Controller('api/users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('users.create')
  @Post('create')
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  public async getCurrentUser(@CurrentUser('id') userId: number) {
    return this.usersService.findOne(userId);
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  public async updateCurrentUser(
    @CurrentUser('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('profile')
  @UseGuards(AuthGuard)
  public async deleteCurrentUser(@CurrentUser('id') userId: number) {
    return this.usersService.delete(userId);
  }
}
