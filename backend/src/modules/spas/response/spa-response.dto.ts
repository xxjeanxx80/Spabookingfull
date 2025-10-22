import { SpaEntity } from '../entities/spa.entity';

export class SpaResponse {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  coverImageUrl?: string;
  approved: boolean;
  ownerId: string;
  services: SpaServiceResponse[];

  static fromEntity(entity: SpaEntity): SpaResponse {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address,
      latitude: entity.latitude,
      longitude: entity.longitude,
      coverImageUrl: entity.coverImageUrl,
      approved: entity.approved,
      ownerId: entity.owner.id,
      services: entity.services?.map(SpaServiceResponse.fromEntity) ?? []
    };
  }
}

export class SpaServiceResponse {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  availableAtHome: boolean;

  static fromEntity(entity: any): SpaServiceResponse {
    return {
      id: entity.id,
      name: entity.name,
      price: Number(entity.price),
      durationMinutes: entity.durationMinutes,
      availableAtHome: entity.availableAtHome
    };
  }
}
