import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

enum PaymentMethod {
  STRIPE = 'stripe',
  WALLET = 'wallet',
}

export class CreatePaymentDto {
  @IsString()
  bookingId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;
}

export { PaymentMethod };
