import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { OwnersService } from './owners.service';
import { CreateOwnerDto, UpdateOwnerStatusDto } from './dto/create-owner.dto';
import { OwnerResponse } from './response/owner-response.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  async create(@Body() dto: CreateOwnerDto) {
    const data = await this.ownersService.create(dto);
    return new ApiResponse(OwnerResponse.fromEntity(data), 'Owner registration submitted');
  }

  @Get()
  async findAll() {
    const data = await this.ownersService.findAll();
    return new ApiResponse(data.map(OwnerResponse.fromEntity));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateOwnerStatusDto) {
    const data = await this.ownersService.updateStatus(id, dto);
    return new ApiResponse(OwnerResponse.fromEntity(data), 'Owner status updated');
  }
}
