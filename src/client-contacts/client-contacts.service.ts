import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientContact } from './entities/client-contact.entity';
import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';
import { CreateClientContactDto } from './dto/create-client-contact.dto';
import { UpdateClientContactDto } from './dto/update-client-contact.dto';

@Injectable()
export class ClientContactsService {
  public constructor(
    @InjectRepository(ClientContact)
    private readonly clientContactRepo: Repository<ClientContact>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async create(payload: CreateClientContactDto) {
    const client = await this.clientRepo.findOne({
      where: { id: payload.clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const contact = this.clientContactRepo.create({
      ...payload,
      client,
    });

    return await this.clientContactRepo.save(contact);
  }

  public async findAll(clientId?: string) {
    if (clientId) {
      return await this.clientContactRepo.find({
        where: {
          client: { id: clientId },
        },
        relations: {
          client: true,
          user: true,
        },
        order: {
          createdAt: 'DESC',
        },
      });
    }

    return await this.clientContactRepo.find({
      relations: {
        client: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findOne(id: string) {
    const contact = await this.clientContactRepo.findOne({
      where: { id },
      relations: {
        client: true,
        user: true,
      },
    });

    if (!contact) {
      throw new NotFoundException('Client contact not found');
    }

    return contact;
  }

  public async update(id: string, payload: UpdateClientContactDto) {
    const contact = await this.findOne(id);

    if (payload.clientId && payload.clientId !== contact.client.id) {
      const client = await this.clientRepo.findOne({
        where: { id: payload.clientId },
      });

      if (!client) {
        throw new NotFoundException('Client not found');
      }

      contact.client = client;
    }

    if (payload.fullName !== undefined) contact.fullName = payload.fullName;
    if (payload.phone !== undefined) contact.phone = payload.phone;
    if (payload.email !== undefined) contact.email = payload.email;
    if (payload.whatsapp !== undefined) contact.whatsapp = payload.whatsapp;
    if (payload.isPrimaryContact !== undefined) {
      contact.isPrimaryContact = payload.isPrimaryContact;
    }
    if (payload.isPortalUser !== undefined) {
      contact.isPortalUser = payload.isPortalUser;
    }

    return await this.clientContactRepo.save(contact);
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.clientContactRepo.softDelete(id);

    return {
      message: 'Client contact deleted successfully',
    };
  }

  public async setPrimary(id: string) {
    const contact = await this.findOne(id);

    await this.clientContactRepo.update(
      { client: { id: contact.client.id } },
      { isPrimaryContact: false },
    );

    contact.isPrimaryContact = true;
    await this.clientContactRepo.save(contact);

    return await this.findOne(id);
  }

  public async assignUser(id: string, userId: string) {
    const contact = await this.findOne(id);

    const user = await this.userRepo.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    contact.user = user;
    contact.isPortalUser = true;

    return await this.clientContactRepo.save(contact);
  }
}
