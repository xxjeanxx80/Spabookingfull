import { IsObject, IsString } from 'class-validator';

export class UpdateSystemSettingsDto {
  @IsString()
  key: string;

  @IsObject()
  value: Record<string, any>;
}

export class AssignRoleDto {
  @IsString()
  userId: string;

  @IsString()
  role: string;
}
