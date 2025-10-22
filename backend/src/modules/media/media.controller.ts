import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaResponse } from './response/media-response.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async upload(@Body() dto: CreateMediaDto) {
    const data = await this.mediaService.create(dto);
    return new ApiResponse(MediaResponse.fromEntity(data), 'Media uploaded');
  }

  @Get(':ownerId')
  async findByOwner(@Param('ownerId') ownerId: string) {
    const data = await this.mediaService.findByOwner(ownerId);
    return new ApiResponse(data.map(MediaResponse.fromEntity));
  }
}
