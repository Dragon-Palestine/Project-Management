import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/createUserDto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateHashPassword } from 'src/utils/helpers';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async create(payload: CreateUserDto): Promise<User> {
    const userExist = await this.userRepo.findOne({
      where: { email: payload.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    try {
      const hashPassword = await generateHashPassword(payload.password);
      const user: User = this.userRepo.create({
        ...payload,
        password: hashPassword,
      });

      return await this.userRepo.save(user);
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (payload.email && payload.email !== user.email) {
      const userExist = await this.userRepo.findOne({
        where: { email: payload.email },
      });

      if (userExist) {
        throw new BadRequestException('Email already exists');
      }
    }

    const nextPassword = payload.password
      ? await generateHashPassword(payload.password)
      : user.password;

    await this.userRepo.save(
      this.userRepo.create({
        ...user,
        ...payload,
        password: nextPassword,
      }),
    );

    return this.findOne(id);
  }

  public async delete(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.userRepo.softDelete(id);

    return { message: 'User deleted successfully' };
  }
}
