import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  spaId: string;

  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsObject()
  workShifts?: Record<string, any>;

  @IsOptional()
  @IsObject()
  timeOff?: Record<string, any>;
}

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
