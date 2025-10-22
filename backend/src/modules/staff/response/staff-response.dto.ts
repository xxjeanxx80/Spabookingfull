import { StaffEntity } from '../entities/staff.entity';

export class StaffResponse {
  id: string;
  name: string;
  skills: string[];
  spaId: string;
  workShifts?: Record<string, any>;
  timeOff?: Record<string, any>;

  static fromEntity(entity: StaffEntity): StaffResponse {
    return {
      id: entity.id,
      name: entity.name,
      skills: entity.skills,
      spaId: entity.spa.id,
      workShifts: entity.workShifts,
      timeOff: entity.timeOff
    };
  }
}
