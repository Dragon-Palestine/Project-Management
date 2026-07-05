import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from 'src/common/dto/createUserDto';

@Controller('api/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  public async loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
