import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey', // 👈 phải trùng với AuthModule
    });
  }

  async validate(payload: any) {
    // 👇 Dữ liệu sẽ được attach vào req.user
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
