import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { SetTimeOffDto } from '../dto/set-time-off.dto';
import { StaffEntity } from '../entities/staff.entity';
import { toStaffResponse } from '../response/staff-response.dto';

@Injectable()
export class StaffService {
  private staffMembers: StaffEntity[] = [
    new StaffEntity({
      id: 'staff-1',
      spaId: 'spa-1',
      fullName: 'Hoa Pham',
      skills: ['Massage', 'Facial'],
      shifts: ['mon:08-16', 'wed:12-20'],
    }),
    new StaffEntity({
      id: 'staff-2',
      spaId: 'spa-1',
      fullName: 'Khanh Le',
      skills: ['Nails', 'Makeup'],
      shifts: ['tue:08-16', 'thu:08-16'],
    }),
  ];

  findAll(pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const items = this.staffMembers
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toStaffResponse);
    return createPaginatedResponse(items, this.staffMembers.length, page, limit);
  }

  findBySpa(spaId: string) {
    return this.staffMembers.filter((member) => member.spaId === spaId).map(toStaffResponse);
  }

  findAvailable(spaId: string, shiftCode: string) {
    return this.staffMembers
      .filter((member) => member.spaId === spaId && member.shifts.includes(shiftCode))
      .map(toStaffResponse);
  }

  create(payload: CreateStaffDto) {
    const entity = new StaffEntity({ id: `staff-${Date.now()}`, ...payload });
    this.staffMembers.push(entity);
    return toStaffResponse(entity);
  }

  update(id: string, payload: UpdateStaffDto) {
    const staff = this.staffMembers.find((member) => member.id === id);
    if (!staff) {
      throw new NotFoundException(`Staff ${id} not found`);
    }
    Object.assign(staff, payload);
    return toStaffResponse(staff);
  }

  setTimeOff(payload: SetTimeOffDto) {
    const staff = this.staffMembers.find((member) => member.id === payload.staffId);
    if (!staff) {
      throw new NotFoundException(`Staff ${payload.staffId} not found`);
    }
    staff.timeOff.push({ startDate: payload.startDate, endDate: payload.endDate });
    return toStaffResponse(staff);
  }
}
