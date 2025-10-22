import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { MediaService } from '../services/media.service';
import { UploadMediaDto } from '../dto/upload-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  upload(@Body() payload: UploadMediaDto) {
    return createApiResponse(this.mediaService.upload(payload));
  }

  @Get()
  list(@Query('category') category: string, @Query('targetId') targetId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.mediaService.list(category, targetId, pagination));
  }
}
