import { UserEntity } from '../entities/user.entity';

export class UserResponse {
  id: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  loyaltyRank: string;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: UserEntity): UserResponse {
    return {
      id: entity.id,
      email: entity.email,
      roles: entity.roles,
      firstName: entity.firstName,
      lastName: entity.lastName,
      avatarUrl: entity.avatarUrl,
      loyaltyPoints: entity.loyaltyPoints,
      loyaltyRank: entity.loyaltyRank,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
