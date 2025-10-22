import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code!: string;

  @IsNumber()
  @Min(0)
  discountPercentage!: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsBoolean()
  active!: boolean;
}
