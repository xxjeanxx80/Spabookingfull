import { IsEnum, IsString } from 'class-validator';

enum UserRole {
  CUSTOMER = 'customer',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export class AssignRoleDto {
  @IsString()
  userId!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

export { UserRole };
