import { ReportEntity } from '../entities/report.entity';

export class ReportResponse {
  id: string;
  reporterId: string;
  subjectId: string;
  subjectType: string;
  description: string;
  status: string;
  createdAt: Date;

  static fromEntity(entity: ReportEntity): ReportResponse {
    return {
      id: entity.id,
      reporterId: entity.reporterId,
      subjectId: entity.subjectId,
      subjectType: entity.subjectType,
      description: entity.description,
      status: entity.status,
      createdAt: entity.createdAt
    };
  }
}
