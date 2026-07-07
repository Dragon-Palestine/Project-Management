import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientContactsService } from './client-contacts.service';
import { CreateClientContactDto } from './dto/create-client-contact.dto';
import { UpdateClientContactDto } from './dto/update-client-contact.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';

@Controller('api/client-contacts')
export class ClientContactsController {
  public constructor(
    private readonly clientContactsService: ClientContactsService,
  ) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.create')
  @Post()
  public async createClientContact(
    @Body() createClientContactDto: CreateClientContactDto,
  ) {
    return await this.clientContactsService.create(createClientContactDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.view')
  @Get()
  public async getClientContacts(@Query('clientId') clientId?: string) {
    return await this.clientContactsService.findAll(clientId);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.view')
  @Get(':id')
  public async getClientContact(@Param('id') id: string) {
    return await this.clientContactsService.findOne(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.update')
  @Patch(':id')
  public async updateClientContact(
    @Param('id') id: string,
    @Body() updateClientContactDto: UpdateClientContactDto,
  ) {
    return await this.clientContactsService.update(id, updateClientContactDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.delete')
  @Delete(':id')
  public async deleteClientContact(@Param('id') id: string) {
    return await this.clientContactsService.delete(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.update')
  @Patch(':id/set-primary')
  public async setPrimary(@Param('id') id: string) {
    return await this.clientContactsService.setPrimary(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('client-contacts.update')
  @Patch(':id/assign-user')
  public async assignUser(
    @Param('id') id: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return await this.clientContactsService.assignUser(
      id,
      assignUserDto.userId,
    );
  }
}
