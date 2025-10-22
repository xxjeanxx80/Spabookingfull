import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateSpaDto } from './dto/create-spa.dto';
import { UpdateSpaDto } from './dto/update-spa.dto';
import { SpaResponse } from './response/spa-response.dto';
import { SpasService } from './spas.service';

@Controller('spas')
export class SpasController {
  constructor(private readonly spasService: SpasService) {}

  @Post()
  async create(@Body() dto: CreateSpaDto) {
    const data = await this.spasService.create(dto);
    return new ApiResponse(SpaResponse.fromEntity(data), 'Spa submitted for approval');
  }

  @Get()
  async findAll(@Query() _pagination: PaginationDto) {
    const data = await this.spasService.findAll();
    return new ApiResponse(data.map(SpaResponse.fromEntity));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.spasService.findOne(id);
    return new ApiResponse(SpaResponse.fromEntity(data));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSpaDto) {
    const data = await this.spasService.update(id, dto);
    return new ApiResponse(SpaResponse.fromEntity(data), 'Spa updated');
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    const data = await this.spasService.approve(id, true);
    return new ApiResponse(SpaResponse.fromEntity(data), 'Spa approved');
  }
}
