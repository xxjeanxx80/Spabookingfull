import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { UploadMediaDto } from '../dto/upload-media.dto';
import { MediaEntity } from '../entities/media.entity';
import { toMediaResponse } from '../response/media-response.dto';

@Injectable()
export class MediaService {
  private mediaStore: MediaEntity[] = [];

  upload(payload: UploadMediaDto) {
    const entity = new MediaEntity({ id: `media-${Date.now()}`, ...payload });
    this.mediaStore.push(entity);
    return toMediaResponse(entity);
  }

  list(category: string, targetId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.mediaStore.filter(
      (item) => (!category || item.category === category) && (!targetId || item.targetId === targetId),
    );
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toMediaResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }
}
