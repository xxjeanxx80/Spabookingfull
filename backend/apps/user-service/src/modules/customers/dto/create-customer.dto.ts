import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

enum CustomerRole {
  CUSTOMER = 'customer',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export class CreateCustomerDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  fullName!: string;

  @IsOptional()
  @IsEnum(CustomerRole, { each: true })
  roles?: CustomerRole[];
}

export { CustomerRole };
