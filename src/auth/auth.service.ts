import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/registerDto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenType, JWTPayloadType } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async register(payload: RegisterDto): Promise<User> {
    const userExist = await this.userRepo.findOne({
      where: { email: payload.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    try {
      const hashPassword = await this.generateHashPassword(payload.password);
      const user: User = this.userRepo.create({
        ...payload,
        password: hashPassword,
      });

      return await this.userRepo.save(user);
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  public async login(payload: LoginDto) {
    const user: User | null = await this.userRepo.findOne({
      where: { email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch: boolean = await bcrypt.compare(
      payload.password,
      user.password,
    );
    console.log(user);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const accessToken: AccessTokenType = await this.generateJwt({
      id: user.id,
      role: user.role,
    });

    return accessToken;
  }

  // public async login(payload: JWTPayloadType): Promise<AccessTokenType> {
  //   return this.generateJwt(payload);
  // }

  /**
   *
   * @param password
   * @returns hash password
   */
  public async generateHashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  /**
   * generate jwt
   * @param payload -> JWTPayloadType
   * @returns {accessToken} -> Promise<AccessTokenType>
   */
  private async generateJwt(payload: JWTPayloadType): Promise<AccessTokenType> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
