import { IsIn, IsString } from 'class-validator';

export const REPORT_SUBJECTS = ['spa', 'service', 'staff', 'booking', 'user'] as const;
export const REPORT_STATUSES = ['open', 'in_review', 'resolved'] as const;

export class CreateReportDto {
  @IsString()
  reporterId: string;

  @IsString()
  subjectId: string;

  @IsIn(REPORT_SUBJECTS)
  subjectType: (typeof REPORT_SUBJECTS)[number];

  @IsString()
  description: string;
}

export class UpdateReportStatusDto {
  @IsIn(REPORT_STATUSES)
  status: (typeof REPORT_STATUSES)[number];
}
