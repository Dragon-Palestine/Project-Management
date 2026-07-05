import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenType, JWTPayloadType } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { Role } from 'src/roles/entitys/role.entity';
import { CreateUserDto } from 'src/common/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(payload: CreateUserDto): Promise<User> {
    return this.userService.create(payload);
  }

  public async login(payload: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch: boolean = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateToken({
      id: user.id,
      role: user.role.name,
    });

    return accessToken;
  }

  private async generateToken(
    payload: JWTPayloadType,
  ): Promise<AccessTokenType> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
