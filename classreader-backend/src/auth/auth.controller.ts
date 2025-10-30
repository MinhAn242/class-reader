import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🧩 Đăng ký
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role, // 🧩 Thêm role (mặc định STUDENT)
    );
    return result;
  }

  // 🔐 Đăng nhập
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(user);
  }
}
