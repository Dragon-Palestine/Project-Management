import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientContactsController } from './client-contacts.controller';
import { ClientContactsService } from './client-contacts.service';
import { ClientContact } from './entities/client-contact.entity';
import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactsService],
  imports: [TypeOrmModule.forFeature([ClientContact, Client, User])],
  exports: [ClientContactsService],
})
export class ClientContactsModule {}
