import { IsEnum, IsOptional, IsString } from 'class-validator';

enum ReportType {
  SERVICE = 'service',
  STAFF = 'staff',
  SPA = 'spa',
}

export class CreateReportDto {
  @IsEnum(ReportType)
  type!: ReportType;

  @IsString()
  targetId!: string;

  @IsString()
  reason!: string;

  @IsOptional()
  @IsString()
  details?: string;
}

export { ReportType };
