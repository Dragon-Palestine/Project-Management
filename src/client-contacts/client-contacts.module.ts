import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientContactsController } from './client-contacts.controller';
import { ClientContactsService } from './client-contacts.service';
import { ClientContact } from './entities/client-contact.entity';
import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';
import { RolePermission } from 'src/roles/entitys/role-permission.entity';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactsService],
  imports: [
    TypeOrmModule.forFeature([ClientContact, Client, User, RolePermission]),
  ],
  exports: [ClientContactsService],
})
export class ClientContactsModule {}
