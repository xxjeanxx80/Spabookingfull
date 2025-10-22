import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DashboardFiltersDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  spaId?: string;
}
