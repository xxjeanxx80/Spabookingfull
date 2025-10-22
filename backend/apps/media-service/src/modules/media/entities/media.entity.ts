import { randomUUID } from 'crypto';
import { MediaCategory } from '../dto/upload-media.dto';

export class MediaEntity {
  id: string = randomUUID();
  category!: MediaCategory;
  targetId!: string;
  fileName!: string;
  url!: string;
  uploadedAt: string = new Date().toISOString();

  constructor(partial: Partial<MediaEntity>) {
    Object.assign(this, partial);
  }
}
