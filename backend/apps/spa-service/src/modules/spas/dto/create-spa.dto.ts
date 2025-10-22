import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSpaDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @IsArray()
  @IsString({ each: true })
  services!: string[];

  @IsBoolean()
  atHomeAvailable!: boolean;

  @IsOptional()
  @IsString()
  mediaUrl?: string;
}
