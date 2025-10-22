import { IsEnum, IsString } from 'class-validator';

enum ReportStatus {
  OPEN = 'open',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

export class UpdateReportStatusDto {
  @IsString()
  reportId!: string;

  @IsEnum(ReportStatus)
  status!: ReportStatus;
}

export { ReportStatus };
