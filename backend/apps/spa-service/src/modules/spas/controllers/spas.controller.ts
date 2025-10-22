import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { SpasService } from '../services/spas.service';
import { CreateSpaDto } from '../dto/create-spa.dto';
import { UpdateSpaDto } from '../dto/update-spa.dto';

@Controller('spas')
export class SpasController {
  constructor(private readonly spasService: SpasService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto & { atHome?: boolean; approved?: boolean }) {
    return createApiResponse(this.spasService.findAll(query));
  }

  @Get('nearby')
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius') radius = 10) {
    return createApiResponse(this.spasService.findNearby(Number(lat), Number(lng), Number(radius)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return createApiResponse(this.spasService.findOne(id));
  }

  @Post()
  create(@Body() payload: CreateSpaDto) {
    return createApiResponse(this.spasService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateSpaDto) {
    return createApiResponse(this.spasService.update(id, payload));
  }

  @Post(':id/approve')
  approve(@Param('id') id: string) {
    return createApiResponse(this.spasService.approve(id));
  }
}
