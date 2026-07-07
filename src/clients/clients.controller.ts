import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/createClientDto';
import { UpdateClientDto } from './dto/updateClientDto';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/clients')
export class ClientsController {
  public constructor(private readonly clientService: ClientsService) {}
  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('clients.create')
  @Post()
  async createAccount(@Body() client: CreateClientDto) {
    return await this.clientService.create(client);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('clients.update')
  @Post('update')
  async updateClient(@Body() client: UpdateClientDto) {
    return await this.clientService.update(client);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('clients.view')
  @Get(':id')
  async getClient(@Param('id') id: string) {
    return await this.clientService.get(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('clients.delete')
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return await this.clientService.delete(id);
  }
}
