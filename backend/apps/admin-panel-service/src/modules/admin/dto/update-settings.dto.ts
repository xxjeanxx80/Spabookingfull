import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsBoolean()
  maintenanceMode?: boolean;

  @IsOptional()
  @IsNumber()
  defaultCommissionRate?: number;
}
