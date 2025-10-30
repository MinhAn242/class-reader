import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔍 Xác thực user khi đăng nhập
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // 🔐 Tạo JWT token khi đăng nhập
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  // 🧩 Đăng ký user mới
  async register(username: string, password: string, role: UserRole = UserRole.STUDENT) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create(username, hashedPassword, role);

    const payload = { username: newUser.username, sub: newUser.id, role: newUser.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      access_token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    };
  }
}
  