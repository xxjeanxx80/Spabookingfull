import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  @IsUrl()
  url: string;

  @IsString()
  ownerId: string;

  @IsString()
  ownerType: string;

  @IsOptional()
  @IsString()
  altText?: string;
}
