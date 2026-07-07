import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/createClientDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { generateHashPassword } from 'src/utils/helpers';
import { UpdateClientDto } from './dto/updateClientDto';

@Injectable()
export class ClientsService {
  public constructor(
    @InjectRepository(Client) private readonly clientRepo: Repository<Client>,
  ) {}
  public async create(payload: CreateClientDto) {
    const { email, password } = payload;
    const clientExist = await this.clientRepo.findOne({ where: { email } });
    if (clientExist) throw new BadRequestException('Client already exist');

    const hashPassword = await generateHashPassword(password);
    payload.password = hashPassword;
    const client = await this.clientRepo.save(payload);
    return client;
  }

  public async get(id: string) {
    const client = await this.clientRepo.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  public async update(payload: UpdateClientDto) {
    const { id, password, ...body } = payload;
    const client = await this.get(id);

    if (body.email && body.email !== client.email) {
      const clientExist = await this.clientRepo.findOne({
        where: { email: body.email },
      });

      if (clientExist) {
        throw new BadRequestException('Client already exist');
      }
    }

    const nextPayload = {
      ...client,
      ...body,
    };

    if (password) {
      nextPayload.password = await generateHashPassword(password);
    }

    await this.clientRepo.save(nextPayload);
    return await this.get(id);
  }

  public async delete(id: string) {
    await this.get(id);
    await this.clientRepo.softDelete(id);

    return {
      message: 'Client deleted successfully',
    };
  }
}
