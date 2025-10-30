import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      const message =
        info?.message === 'No auth token'
          ? 'Missing authentication token'
          : info?.message || 'Invalid or expired token';
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
