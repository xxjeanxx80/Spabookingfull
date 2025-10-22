import { IsDateString, IsString } from 'class-validator';

export class SetTimeOffDto {
  @IsString()
  staffId!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}
