import { MediaEntity } from '../entities/media.entity';

export class MediaResponse {
  id: string;
  url: string;
  ownerId: string;
  ownerType: string;
  altText?: string;
  createdAt: Date;

  static fromEntity(entity: MediaEntity): MediaResponse {
    return {
      id: entity.id,
      url: entity.url,
      ownerId: entity.ownerId,
      ownerType: entity.ownerType,
      altText: entity.altText,
      createdAt: entity.createdAt
    };
  }
}
