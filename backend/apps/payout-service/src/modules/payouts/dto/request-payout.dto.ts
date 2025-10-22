import { IsNumber, IsString, Min } from 'class-validator';

export class RequestPayoutDto {
  @IsString()
  spaId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}
