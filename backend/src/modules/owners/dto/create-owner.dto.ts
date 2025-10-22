import { IsIn, IsOptional, IsString } from 'class-validator';

export const OWNER_STATUSES = ['pending', 'approved', 'rejected'] as const;

export class CreateOwnerDto {
  @IsString()
  userId: string;

  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  taxId?: string;
}

export class UpdateOwnerStatusDto {
  @IsIn(OWNER_STATUSES)
  status: (typeof OWNER_STATUSES)[number];
}
