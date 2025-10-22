import { IsNumber, IsString, Min } from 'class-validator';

export class RefundPaymentDto {
  @IsString()
  paymentId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}
