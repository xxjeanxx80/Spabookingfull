import { randomUUID } from 'crypto';

export class StaffEntity {
  id: string = randomUUID();
  spaId!: string;
  fullName!: string;
  skills: string[] = [];
  shifts: string[] = [];
  timeOff: { startDate: string; endDate: string }[] = [];

  constructor(partial: Partial<StaffEntity>) {
    Object.assign(this, partial);
  }
}
