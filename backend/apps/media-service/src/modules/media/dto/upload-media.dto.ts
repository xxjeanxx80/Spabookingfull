import { IsEnum, IsString } from 'class-validator';

enum MediaCategory {
  SPA = 'spa',
  SERVICE = 'service',
  STAFF = 'staff',
  POST = 'post',
}

export class UploadMediaDto {
  @IsEnum(MediaCategory)
  category!: MediaCategory;

  @IsString()
  targetId!: string;

  @IsString()
  fileName!: string;

  @IsString()
  url!: string;
}

export { MediaCategory };
