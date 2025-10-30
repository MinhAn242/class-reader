// src/users/dto/update-role.dto.ts
import { IsEnum } from 'class-validator';
import { UserRole } from '../../common/entities/user.entity';

export class UpdateRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
