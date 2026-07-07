import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientContactsService } from './client-contacts.service';
import { CreateClientContactDto } from './dto/create-client-contact.dto';
import { UpdateClientContactDto } from './dto/update-client-contact.dto';
import { AssignUserDto } from './dto/assign-user.dto';

@Controller('api/client-contacts')
export class ClientContactsController {
  public constructor(
    private readonly clientContactsService: ClientContactsService,
  ) {}

  @Post()
  public async createClientContact(
    @Body() createClientContactDto: CreateClientContactDto,
  ) {
    return await this.clientContactsService.create(createClientContactDto);
  }

  @Get()
  public async getClientContacts(@Query('clientId') clientId?: string) {
    return await this.clientContactsService.findAll(clientId);
  }

  @Get(':id')
  public async getClientContact(@Param('id') id: string) {
    return await this.clientContactsService.findOne(id);
  }

  @Patch(':id')
  public async updateClientContact(
    @Param('id') id: string,
    @Body() updateClientContactDto: UpdateClientContactDto,
  ) {
    return await this.clientContactsService.update(id, updateClientContactDto);
  }

  @Delete(':id')
  public async deleteClientContact(@Param('id') id: string) {
    return await this.clientContactsService.delete(id);
  }

  @Patch(':id/set-primary')
  public async setPrimary(@Param('id') id: string) {
    return await this.clientContactsService.setPrimary(id);
  }

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
