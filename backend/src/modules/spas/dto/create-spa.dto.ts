import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateSpaServiceDto {
  @IsString()
  name: string;

  @Type(() => Number)
  price: number;

  @Type(() => Number)
  durationMinutes: number;

  @Type(() => Boolean)
  @IsBoolean()
  availableAtHome: boolean;
}

export class CreateSpaDto {
  @IsString()
  ownerId: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpaServiceDto)
  services: CreateSpaServiceDto[];
}
