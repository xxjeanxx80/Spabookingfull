import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  spaId!: string;

  @IsString()
  fullName!: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  shifts?: string[];
}
