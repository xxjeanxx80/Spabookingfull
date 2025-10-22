import { StaffEntity } from '../entities/staff.entity';

export interface StaffResponseDto {
  id: string;
  spaId: string;
  fullName: string;
  skills: string[];
  shifts: string[];
  timeOff: { startDate: string; endDate: string }[];
}

export const toStaffResponse = (entity: StaffEntity): StaffResponseDto => ({
  id: entity.id,
  spaId: entity.spaId,
  fullName: entity.fullName,
  skills: entity.skills,
  shifts: entity.shifts,
  timeOff: entity.timeOff,
});
