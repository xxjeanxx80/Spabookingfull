import { MediaEntity } from '../entities/media.entity';

export interface MediaResponseDto {
  id: string;
  category: string;
  targetId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

export const toMediaResponse = (entity: MediaEntity): MediaResponseDto => ({
  id: entity.id,
  category: entity.category,
  targetId: entity.targetId,
  fileName: entity.fileName,
  url: entity.url,
  uploadedAt: entity.uploadedAt,
});
