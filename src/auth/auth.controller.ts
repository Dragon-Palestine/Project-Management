import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';

@Controller('api/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  public async loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
