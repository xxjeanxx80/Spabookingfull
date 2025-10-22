import { randomUUID } from 'crypto';
import { ReportStatus } from '../dto/update-report-status.dto';
import { ReportType } from '../dto/create-report.dto';

export class ReportEntity {
  id: string = randomUUID();
  type!: ReportType;
  targetId!: string;
  reason!: string;
  details?: string;
  status: ReportStatus = ReportStatus.OPEN;
  createdAt: string = new Date().toISOString();

  constructor(partial: Partial<ReportEntity>) {
    Object.assign(this, partial);
  }
}
