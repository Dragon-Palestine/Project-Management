import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/createClientDto';
import { UpdateClientDto } from './dto/updateClientDto';

@Controller('api/clients')
export class ClientsController {
  public constructor(private readonly clientService: ClientsService) {}
  @Post()
  async createAccount(@Body() client: CreateClientDto) {
    return await this.clientService.create(client);
  }

  @Post('update')
  async updateClient(@Body() client: UpdateClientDto) {
    return await this.clientService.update(client);
  }

  @Get(':id')
  async getClient(@Param('id') id: string) {
    return await this.clientService.get(id);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return await this.clientService.delete(id);
  }
}
