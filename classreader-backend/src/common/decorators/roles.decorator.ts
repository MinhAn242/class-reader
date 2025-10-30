import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

// Key metadata để RolesGuard đọc
export const ROLES_KEY = 'roles';

// Decorator gắn role cho route
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
