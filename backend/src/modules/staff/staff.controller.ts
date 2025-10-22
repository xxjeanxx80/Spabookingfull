import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreateStaffDto, UpdateStaffDto } from './dto/create-staff.dto';
import { StaffResponse } from './response/staff-response.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() dto: CreateStaffDto) {
    const data = await this.staffService.create(dto);
    return new ApiResponse(StaffResponse.fromEntity(data), 'Staff created');
  }

  @Get()
  async findAll() {
    const data = await this.staffService.findAll();
    return new ApiResponse(data.map(StaffResponse.fromEntity));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    const data = await this.staffService.update(id, dto);
    return new ApiResponse(StaffResponse.fromEntity(data), 'Staff updated');
  }
}
