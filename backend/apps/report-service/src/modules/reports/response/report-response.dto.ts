import { ReportEntity } from '../entities/report.entity';

export interface ReportResponseDto {
  id: string;
  type: string;
  targetId: string;
  reason: string;
  details?: string;
  status: string;
  createdAt: string;
}

export const toReportResponse = (entity: ReportEntity): ReportResponseDto => ({
  id: entity.id,
  type: entity.type,
  targetId: entity.targetId,
  reason: entity.reason,
  details: entity.details,
  status: entity.status,
  createdAt: entity.createdAt,
});
